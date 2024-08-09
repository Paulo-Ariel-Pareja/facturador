import { registerAs } from '@nestjs/config';

export default registerAs('erpConfig', () => ({
  url: process.env.ERP_URL,
  creaCliente: process.env.CREA_CLIENTE,
  crearArticulo: process.env.CREAR_ARTICULO,
  calcular: process.env.CALCULAR,
  confirmar: process.env.CONFIRMAR,
  pedirCAE: process.env.PEDIR_CAE,
  enviarEmail: process.env.ENVIAR_EMAIL,
  bearer: process.env.BEARER,
  urlFc: process.env.ERP_URL_USER,
}));
