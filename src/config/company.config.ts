import { registerAs } from '@nestjs/config';

export default registerAs('companyConfig', () => ({
  EMPRE: process.env.EMPRE,
  CODCOM: process.env.CODCOM,
  NUMSUC: process.env.NUMSUC,
  SUCEXT: process.env.SUCEXT,
  COMEXT: process.env.COMEXT,
  FISCBT: process.env.FISCBT,
  FISPVT: process.env.FISPVT,
  TIPRES: process.env.TIPRES,
  CODTRA: process.env.CODTRA,
  CODDOM: process.env.CODDOM,
  CODCOB: process.env.CODCOB,
  CODPRE: process.env.CODPRE,
  CODDES: process.env.CODDES,
  CODVEN: process.env.CODVEN,
  CODCOT: process.env.CODCOT,
  NUMALM: process.env.NUMALM,
  NUMCEC: process.env.NUMCEC,
  MODIUSU: process.env.MODIUSU,
  CODMED: process.env.CODMED,
}));
