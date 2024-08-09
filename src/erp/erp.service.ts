import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';
import { Factura } from './interface/factura.interface';
import { FacturaHelper } from './helper/factura.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ErpService {
  private codmed: string;

  constructor(
    private readonly fcHelper: FacturaHelper,
    private readonly configService: ConfigService,
  ) {
    this.codmed = this.configService.getOrThrow('companyConfig.CODMED');
  }

  generateFc(fc: Factura) {
    return `This action updates a #${fc.ID01} erp`;
  }

  fakeData(): Factura {
    const ID01: string = uuidv4();
    const fechaActual = dayjs().format('YYYY-MM-DDTHH:mm:ss');

    const NUMCOM: number = 1;
    const DENOMI: string = 'NOMBRE DE PRUEBA';
    const NUMDOC = '31009697';
    const NETGRA = 99.99;
    const IVA = 123.45;
    const totalFc = NETGRA + IVA;

    const CODDOC = NUMDOC.length === 8 ? '96' : '80';
    const proforma = this.fcHelper.makeProforma(
      ID01,
      NUMCOM,
      fechaActual,
      NUMDOC,
      DENOMI,
      CODDOC,
      NUMDOC,
      NETGRA,
      IVA,
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

    //iterar por los items de la db
    const item = this.fcHelper.makeItemDetail(
      ID01,
      NUMCOM, // NUMCOM
      1, // ITEM
      '', // COMANT
      1, // CANTID
      123, // NETGRA1
      0.0, // IMPEXE
      21.0, //PORIVA
      IVA, // IMPIVA
      12, // IMPTOT
      321, // IMPTOT2
      '05413350811', // CUENTA
      450, // NUMALM
      450, // NUMCEC
      1, // ALMORD
      null, // CODPRO
      '', // ANTESIGU
      0, // PLAZO
      fechaActual, // fechaActual
      564, // VARIO1
      '', // INGREGRE
      0, // NUMCUO
      'A', // OBSERV
      '', // CONCIL
      'A', // ARCHIVO
    );

    proforma.Detail.push(item);

    const fc: Factura = {
      ...proforma,
    };
    return fc;
  }
}
