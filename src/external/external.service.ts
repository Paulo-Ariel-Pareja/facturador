import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { Factura } from '../erp/interface/factura.interface';
import { ExternalResponseDto } from './dto/external-response.dto';
import { Status } from './enums/status.enum';

@Injectable()
export class ExternalService {
  private readonly logger = new Logger(ExternalService.name);
  private url: string;
  private creaCliente: string;
  private crearArticulo: string;
  private calcular: string;
  private confirmar: string;
  private pedirCAE: string;
  private enviarEmail: string;
  private bearer: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.url = this.configService.getOrThrow('erpConfig.url');
    this.creaCliente = this.configService.getOrThrow('erpConfig.creaCliente');
    this.crearArticulo = this.configService.getOrThrow(
      'erpConfig.crearArticulo',
    );
    this.calcular = this.configService.getOrThrow('erpConfig.calcular');
    this.confirmar = this.configService.getOrThrow('erpConfig.confirmar');
    this.pedirCAE = this.configService.getOrThrow('erpConfig.pedirCAE');
    this.enviarEmail = this.configService.getOrThrow('erpConfig.enviarEmail');
    this.bearer = this.configService.getOrThrow('erpConfig.bearer');
  }
  async makeRequest(bodyRequest: Factura) {
    const headersRequest: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: this.bearer,
      },
    };
    const bodyParams = new URLSearchParams();
    bodyParams.append('JSONdata', JSON.stringify(bodyRequest));
    bodyParams.append('creaCliente', this.creaCliente);
    bodyParams.append('crearArticulo', this.crearArticulo);
    bodyParams.append('calcular', this.calcular);
    bodyParams.append('confirmar', this.confirmar);
    bodyParams.append('pedirCAE', this.pedirCAE);
    bodyParams.append('enviarEmail', this.enviarEmail);
    const body = bodyParams;

    const { data } = await firstValueFrom(
      this.httpService
        .post<ExternalResponseDto>(this.url, body, headersRequest)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw error.response.data;
          }),
        ),
    );
    if (data.Status !== Status.success)
      throw new BadRequestException(data.Message);
    return data;
  }
}
