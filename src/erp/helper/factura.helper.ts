import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FacturaHelper {
  private empre: string;
  private codcom: string;
  private numsuc: number;
  private sucext: number;
  private comext: number;
  private fiscbt: string;
  private fispvt: string;
  private tipres: string;
  private codtra: string;
  private coddom: string;
  private codcob: string;
  private codpre: string;
  private coddes: string;
  private codven: string;
  private codcot: string;
  private numalm: number;
  private numcec: number;
  private modiusu: string;

  constructor(private readonly configService: ConfigService) {
    this.empre = this.configService.getOrThrow('companyConfig.EMPRE');
    this.codcom = this.configService.getOrThrow('companyConfig.CODCOM');
    this.numsuc = Number(this.configService.getOrThrow('companyConfig.NUMSUC'));
    this.sucext = Number(this.configService.getOrThrow('companyConfig.SUCEXT'));
    this.comext = Number(this.configService.getOrThrow('companyConfig.COMEXT'));
    this.fiscbt = this.configService.getOrThrow('companyConfig.FISCBT');
    this.fispvt = this.configService.getOrThrow('companyConfig.FISPVT');
    this.tipres = this.configService.getOrThrow('companyConfig.TIPRES');
    this.codtra = this.configService.getOrThrow('companyConfig.CODTRA');
    this.coddom = this.configService.getOrThrow('companyConfig.CODDOM');
    this.codcob = this.configService.getOrThrow('companyConfig.CODCOB');
    this.codpre = this.configService.getOrThrow('companyConfig.CODPRE');
    this.coddes = this.configService.getOrThrow('companyConfig.CODDES');
    this.codven = this.configService.getOrThrow('companyConfig.CODVEN');
    this.codcot = this.configService.getOrThrow('companyConfig.CODCOT');
    this.numalm = Number(this.configService.getOrThrow('companyConfig.NUMALM'));
    this.numcec = Number(this.configService.getOrThrow('companyConfig.NUMCEC'));
    this.modiusu = this.configService.getOrThrow('companyConfig.MODIUSU');
  }

  makeProforma(
    ID01: string,
    NUMCOM: number,
    fechaActual: string,
    CODTER: string,
    DENOMI: string,
    CODDOC: string,
    NUMDOC: string,
    NETGRA: number,
    IVA: number,
    CODMED: string,
  ) {
    const IDUNI: string = uuidv4();
    return {
      ID01,
      ID01A: '',
      EMPRE: this.empre,
      CODCOM: this.codcom,
      NUMSUC: this.numsuc,
      NUMCOM,
      FECHA: fechaActual,
      SUCEXT: this.sucext,
      COMEXT: this.comext,
      FECEXT: fechaActual,
      FISCBT: this.fiscbt,
      FISPVT: this.fispvt,
      FISNUM: NUMCOM,
      COMANT: null,
      SUCANT: 0,
      NUMANT: 0,
      ASICBT: '',
      ASISUC: 0,
      ASINUM: 0,
      ASIID: '',
      CODTER,
      DENOMI,
      CODDOC,
      NUMDOC,
      TIPRES: this.tipres,
      CODTRA: this.codtra,
      CODDOM: this.coddom,
      CODCOB: this.codcob,
      CODPRE: this.codpre,
      CODDES: this.coddes,
      CODVEN: this.codven,
      CODCOT: this.codcot,
      COTIZ: 1,
      NETGRA1: NETGRA,
      NO_GRA: 0.0,
      NO_GRA2: 0.0,
      IMPBON: 0.0,
      PORDES: 0.0,
      IMPDES: 0.0,
      NETGRA2: NETGRA,
      IMPIVA: IVA,
      IMPRNI: 0.0,
      IMRG2784: 0.0,
      IMRG3337: 0.0,
      IMPTOT: NETGRA + IVA,
      NUMALM: this.numalm,
      NUMCEC: this.numcec,
      CONTAB: 'N',
      DEPURA: 'N',
      IMPRESO: 2,
      PANREL: 'FCTR',
      ALMORD: 1,
      IMPRIIB: 0.0,
      IMRG3452: 0.0,
      CODFIN: '0000',
      NUMCUO: 1,
      EMIDOC: 'N',
      CODMED,
      NUMTAR: '',
      FECREC: fechaActual,
      COBENV: null,
      ACTIVI: 0,
      PORDES1: 0.0,
      PORDES2: 0.0,
      PORDES3: 0.0,
      CODPRO: null,
      IMPPERC: 0,
      CAINUM: '',
      CAIVTO: '',
      CAIMOTIVO: null,
      IMRG31XX: 0,
      IMRG3938: 0,
      RETIIB: 0,
      DEDU3938: 0,
      CODTER2: null,
      DESPACHO: null,
      TIPO_EXPO: null,
      DST_CMP: null,
      INCOTERMS: null,
      IDIOMA_CBTE: null,
      SECTOR: null,
      APROUSU: null,
      APROAMD: null,
      IDUNI,
      MODIUSU: this.modiusu,
      MODIAMD: fechaActual,
      DV: null,
      extEMAIL: null,
      extORIGEN: null,
      extDIRECC: null,
      extLOCALI: null,
      extCODPOS: null,
      Detail: [],
    };
  }

  makeItemDetail(
    ID01: string,
    NUMCOM: number,
    ITEM: number,
    COMANT: string,
    CANTID: number,
    NETGRA1: number,
    IMPEXE: number,
    PORIVA: number,
    IMPIVA: number,
    IMPTOT: number,
    IMPTOT2: number,
    CUENTA: string,
    NUMALM: number,
    NUMCEC: number,
    ALMORD: number,
    CODPRO: string,
    ANTESIGU: string,
    PLAZO: number,
    fechaActual: string,
    VARIO1: number,
    INGREGRE: string,
    NUMCUO: number,
    OBSERV: string,
    CONCIL: string,
    ARCHIVO: string,
  ) {
    const ID02: string = uuidv4();
    const IDUNI: string = uuidv4();
    return {
      ID01,
      ID02,
      ID02A: 'N/A',
      EMPRE: this.empre,
      CODCOM: this.codcom,
      NUMSUC: this.numsuc,
      NUMCOM,
      ITEM,
      COMANT,
      SUCANT: 0,
      NUMANT: 0,
      ITEANT: 0,
      CANTID,
      UNIDAD: 0.0,
      CONCEP: '',
      CODCOT: 'PES',
      NETGRA1,
      NO_GRA: 0.0,
      IMPEXE,
      IMPBON: 0.0,
      IMPDESC: 0.0,
      PORIVA,
      IMPIVA,
      IMPTOT,
      IMPTOT2,
      CUENTA,
      CODTER: 'N/A',
      NUMALM,
      NUMCEC,
      ALMORD,
      CODPRO,
      PANREL: 'FCTR',
      ACTIVI: 0,
      ANTESIGU,
      PLAZO,
      FECHA: fechaActual,
      NUMERO: '',
      INGREGRE,
      NUMCUO,
      OBSERV,
      CONCIL,
      VARIO1,
      FECVAL: fechaActual,
      ARCHIVO,
      SECTOR: null,
      IDUNI,
      MODIUSU: this.modiusu,
      MODIAMD: fechaActual,
      DV: null,
    };
  }
}
