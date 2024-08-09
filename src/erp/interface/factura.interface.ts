export interface Factura {
  ID01: string;
  ID01A: string;
  EMPRE: string;
  CODCOM: string;
  NUMSUC: number;
  NUMCOM: number;
  FECHA: string;
  SUCEXT: number;
  COMEXT: number;
  FECEXT: string;
  FISCBT: string;
  FISPVT: string;
  FISNUM: number;
  COMANT: null;
  SUCANT: number;
  NUMANT: number;
  ASICBT: string;
  ASISUC: number;
  ASINUM: number;
  ASIID: string;
  CODTER: string;
  DENOMI: string;
  CODDOC: string;
  NUMDOC: string;
  TIPRES: string;
  CODTRA: string;
  CODDOM: string;
  CODCOB: string;
  CODPRE: string;
  CODDES: string;
  CODVEN: string;
  CODCOT: string;
  COTIZ: number;
  NETGRA1: number;
  NO_GRA: number;
  NO_GRA2: number;
  IMPBON: number;
  PORDES: number;
  IMPDES: number;
  NETGRA2: number;
  IMPIVA: number;
  IMPRNI: number;
  IMRG2784: number;
  IMRG3337: number;
  IMPTOT: number;
  NUMALM: number;
  NUMCEC: number;
  CONTAB: string;
  DEPURA: string;
  IMPRESO: number;
  PANREL: string;
  ALMORD: number;
  IMPRIIB: number;
  IMRG3452: number;
  CODFIN: string;
  NUMCUO: number;
  EMIDOC: string;
  CODMED: string;
  NUMTAR: string;
  FECREC: string;
  COBENV: null;
  ACTIVI: number;
  PORDES1: number;
  PORDES2: number;
  PORDES3: number;
  CODPRO: null;
  IMPPERC: number;
  CAINUM: string;
  CAIVTO: string;
  CAIMOTIVO: string;
  IMRG31XX: number;
  IMRG3938: number;
  RETIIB: number;
  DEDU3938: number;
  CODTER2: null;
  DESPACHO: null;
  TIPO_EXPO: null;
  DST_CMP: null;
  INCOTERMS: null;
  IDIOMA_CBTE: null;
  SECTOR: null;
  APROUSU: null;
  APROAMD: null;
  IDUNI: string;
  MODIUSU: string;
  MODIAMD: string;
  DV: null;
  extEMAIL: null;
  extORIGEN: null;
  extDIRECC: null;
  extLOCALI: null;
  extCODPOS: null;
  Detail: Detail[];
}

interface Detail {
  ID01: string;
  ID02: string;
  ID02A: string;
  EMPRE: string;
  CODCOM: string;
  NUMSUC: number;
  NUMCOM: number;
  ITEM: number;
  COMANT: string;
  SUCANT: number;
  NUMANT: number;
  ITEANT: number;
  CANTID: number;
  UNIDAD: number;
  CONCEP: string;
  CODCOT: string;
  NETGRA1: number;
  NO_GRA: number;
  IMPEXE: number;
  IMPBON: number;
  IMPDESC: number;
  PORIVA: number;
  IMPIVA: number;
  IMPTOT: number;
  IMPTOT2: number;
  CUENTA: string;
  CODTER: string;
  NUMALM: number;
  NUMCEC: number;
  ALMORD: number;
  CODPRO: string;
  PANREL: string;
  ACTIVI: number;
  ANTESIGU: null;
  PLAZO: number;
  FECHA: string;
  NUMERO: string;
  INGREGRE: null;
  NUMCUO: number;
  OBSERV: string;
  CONCIL: string;
  VARIO1: number;
  FECVAL: string;
  ARCHIVO: string;
  SECTOR: null;
  IDUNI: string;
  MODIUSU: string;
  MODIAMD: string;
  DV: null;
  extDENOMI: string;
  extCODUNI: string;
  extCODIGO: string;
}
