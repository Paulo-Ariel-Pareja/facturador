import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import { WebService } from './web.service';
import { Web } from './entities/web.entity';
import { FacturaHelper } from '../erp/helper/factura.helper';
import { ExternalService } from '../external/external.service';
import { CounterService } from '../counter/counter.service';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class CronjobWebService {
  private readonly logger = new Logger(CronjobWebService.name);
  private codmed: string;
  private publicUrl: string;
  private publicGiftUrl: string;
  private bcc: string;
  private numsuc: number;
  private emergency: string[];
  private readonly defaultNumDoc = '11111111';

  constructor(
    private readonly webService: WebService,
    private readonly fcHelper: FacturaHelper,
    private readonly configService: ConfigService,
    private readonly external: ExternalService,
    private readonly counterService: CounterService,
    private readonly mailerService: MailerService,
  ) {
    this.codmed = this.configService.getOrThrow('companyConfig.CODMED');
    this.publicUrl = this.configService.getOrThrow('erpConfig.urlFc');
    this.publicGiftUrl = this.publicUrl.replace('PDF2', 'PDFR');
    this.bcc = this.configService.get('emailConfig.bcc');
    this.numsuc = Number(this.configService.getOrThrow('companyConfig.NUMSUC'));
    this.emergency = this.configService
      .getOrThrow('emailConfig.emergency')
      .split(',');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    try {
      this.logger.debug('obtener id_canal de la operacion a facturar');
      const operationToFC =
        await this.webService.getOneIdCanalOfOperationsWithoutFC();
      if (!operationToFC) {
        this.logger.log('NO HAY OPERACIONES PARA FACTURAR');
        return;
      }

      const id_canal = operationToFC.id_canal;

      const ID01: string = uuidv4();
      const fechaActual = dayjs().format('YYYY-MM-DDTHH:mm:ss');
      const { fc_number } = await this.counterService.getLatest();
      this.logger.debug(`ULTIMA FC NUMERO: ${fc_number}`);
      const NUMCOM: number = fc_number + 1;

      this.logger.debug(`obtener operacion con id_canal: ${id_canal}`);
      const operation: Web[] =
        await this.webService.getOperationFromDb(id_canal);

      const DENOMI: string = operation[0].comprador;
      let rawDocument = operation[0].documento;
      if (!rawDocument) rawDocument = this.defaultNumDoc;
      let NUMDOC = rawDocument.replace(/\D/g, '');
      if (NUMDOC.length === 0) NUMDOC = this.defaultNumDoc;
      const CODDOC = NUMDOC.length <= 8 ? '96' : '80';
      const subTotal = operation.reduce((n, { sub_total }) => n + sub_total, 0);
      const descuento = operation.reduce(
        (n, { descuento_compra }) => n + descuento_compra,
        0,
      );
      const costoEnvio = operation.reduce(
        (n, { costo_envio }) => n + costo_envio,
        0,
      );
      const totalFc = subTotal - descuento + costoEnvio;
      const totalSinIva = this.formatDecimal(totalFc / 1.21);
      const totalIvaAmount = this.formatDecimal(totalFc - totalSinIva);

      const proforma = this.fcHelper.makeProforma(
        ID01,
        NUMCOM,
        fechaActual,
        NUMDOC, // CODTER
        DENOMI,
        CODDOC,
        NUMDOC,
        totalSinIva, // se mapea contra NETGRA 1 Y 2
        totalIvaAmount, // IVA
        this.codmed,
      );

      const itemPayment = this.fcHelper.makeItemDetail(
        ID01,
        NUMCOM, // NUMCOM
        0, // ITEM
        'N/A', // COMANT
        totalFc, // CANTID
        0.0, // NETGRA1
        1.0, // IMPEXE
        0.0, // PORIVA
        0.0, // IMPIVA
        1.0, // IMPTOT
        totalFc, // IMPTOT2
        this.codmed, // CUENTA
        0, // NUMALM
        450, // NUMCEC
        0, // ALMORD
        '_[A]_', // CODPRO
        'N', // ANTESIGU
        0, // PLAZO
        fechaActual,
        0, // VARIO1
        'I', // INGREGRE
        1, // NUMCUO
        '', // OBSERV
        'N', // CONCIL
        'F', // ARCHIVO
      );
      proforma.Detail.push(itemPayment);
      let itemNumber = 0;

      // insercion de items que compro
      for (const line of operation) {
        itemNumber = itemNumber + 1;
        let codigo = line.codigo;
        if (codigo.length >= 7) codigo = codigo.substring(0, 6);
        const { proveedor } = await this.webService.getProvDataFromDb(codigo);
        const sku = `${proveedor}${codigo}`;
        const cantidad = line.cantidad;
        const totalLinea = line.sub_total;
        const precioUnidad = totalLinea / cantidad;
        const precioSinIvaItem = precioUnidad / 1.21;
        const ivaAmount = precioUnidad - precioSinIvaItem;

        const item = this.fcHelper.makeItemDetail(
          ID01,
          NUMCOM, // NUMCOM
          itemNumber, // ITEM
          '', // COMANT
          cantidad, // CANTID
          precioSinIvaItem, // NETGRA1
          0.0, // IMPEXE
          21.0, //PORIVA
          ivaAmount, // IMPIVA
          precioUnidad, // IMPTOT
          //totalLinea, // IMPTOT2
          precioSinIvaItem, // IMPTOT2
          sku, // CUENTA
          450, // NUMALM
          450, // NUMCEC
          1, // ALMORD
          null, // CODPRO
          '', // ANTESIGU
          0, // PLAZO
          fechaActual, // fechaActual
          precioUnidad, // VARIO1
          '', // INGREGRE
          0, // NUMCUO
          'A', // OBSERV
          '', // CONCIL
          'A', // ARCHIVO
        );

        proforma.Detail.push(item);
      }

      // insercion de descuentos
      for (const line of operation) {
        itemNumber = itemNumber + 1;
        const descuento = line.descuento_compra;
        if (descuento && descuento > 0) {
          const descuentoACargar = descuento - descuento - descuento;
          const item = this.fcHelper.makeItemDetail(
            ID01,
            NUMCOM, // NUMCOM
            itemNumber, // ITEM
            '', // COMANT
            descuentoACargar, // CANTID
            0.826446, // NETGRA1
            0.0, // IMPEXE
            21.0, //PORIVA
            0.173554, // IMPIVA
            1, // IMPTOT
            0.826446, // IMPTOT2
            '99999900600', // CUENTA
            450, // NUMALM
            450, // NUMCEC
            1, // ALMORD
            null, // CODPRO
            '', // ANTESIGU
            0, // PLAZO
            fechaActual, // fechaActual
            descuentoACargar, // VARIO1
            '', // INGREGRE
            0, // NUMCUO
            'A', // OBSERV
            '', // CONCIL
            'A', // ARCHIVO
          );

          proforma.Detail.push(item);
        }
      }

      // insercion de envio
      for (const line of operation) {
        itemNumber = itemNumber + 1;
        const costoEnvio = line.costo_envio;
        if (costoEnvio && costoEnvio > 0) {
          const item = this.fcHelper.makeItemDetail(
            ID01,
            NUMCOM, // NUMCOM
            itemNumber, // ITEM
            '', // COMANT
            costoEnvio, // CANTID
            0.826446, // NETGRA1
            0.0, // IMPEXE
            21.0, //PORIVA
            0.173554, // IMPIVA
            1, // IMPTOT
            0.826446, // IMPTOT2
            '99999900400', // CUENTA
            450, // NUMALM
            450, // NUMCEC
            1, // ALMORD
            null, // CODPRO
            '', // ANTESIGU
            0, // PLAZO
            fechaActual, // fechaActual
            0, // VARIO1
            '', // INGREGRE
            0, // NUMCUO
            'A', // OBSERV
            '', // CONCIL
            'A', // ARCHIVO
          );

          proforma.Detail.push(item);
        }
      }

      this.logger.log(`VOY A LLAMAR A ERP ID01: ${ID01}`);
      await this.external.makeRequest(proforma);

      this.logger.log(
        `ACTUALIZANDO TABLA SEQUENCIAL Y REGISTROS PARA id_canal: ${id_canal}`,
      );
      await this.counterService.updateLatest({
        fc_number: NUMCOM,
        id_mercadopago: operation[0].id_mercadopago,
      });

      await this.webService.updateFcId(
        id_canal,
        `${this.numsuc}_B${NUMCOM}`,
        operation.length,
      );

      // EN DESARROLLO NO DEJAR EL MAIL DE LA OPERACION
      const mail = operation[0].email;

      this.logger.log(`ENVIANDO MAIL A: ${mail}`);

      await this.mailerService.sendFc(
        mail,
        DENOMI,
        `${this.publicUrl}${ID01}`,
        `${this.publicGiftUrl}${ID01}`,
        this.bcc,
      );
      this.logger.log('FIN PROCESO');
    } catch (error) {
      this.logger.error(error);

      const html = `
      <p>SE VA A APAGAR EL FACTURADOR,</p>
      <p>por favor resuelva inconveniente antes de volver a iniciar proceso</p>
      <br>
      <p>Error message: ${error.message}</p>
      <br>
      <p>Error:</p>
      <p>${error}</p>`;

      await this.mailerService.sendHtmlPlain(
        '[EMERGENCY] - facturador',
        this.emergency,
        html,
      );
      process.exit(1);
    }
  }

  private formatDecimal(decimalNoFormated: number) {
    return Number(decimalNoFormated.toFixed(2));
  }
}
