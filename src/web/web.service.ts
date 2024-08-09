import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Web } from './entities/web.entity';
import { Articulo } from './entities/articulo.entity';
import { ProveedorDto } from './dto/proveedor.dto';
import { IdCanalGroupDto } from './dto/idCanalGroup.dto';

@Injectable()
export class WebService {
  constructor(
    @InjectRepository(Articulo)
    private artDb: Repository<Articulo>,
    @InjectRepository(Web)
    private webDb: Repository<Web>,
  ) {}

  async getOperationsFromDb() {
    const idCanalList = await this.getOneIdCanalOfOperationsWithoutFC();
    return idCanalList;
  }

  async getOperationFromDb(id_canal: string) {
    return this.webDb.find({
      select: {},
      where: {
        id_canal,
      },
    });
  }

  async updateFcId(id_canal: string, fcId: string, limit: number) {
    await this.webDb
      .createQueryBuilder()
      .update(Web)
      .set({
        factura: fcId,
      })
      .where('id_canal = :id_canal', { id_canal })
      .limit(limit)
      .execute();
  }

  async getOneIdCanalOfOperationsWithoutFC(): Promise<IdCanalGroupDto> {
    return this.webDb
      .createQueryBuilder('h1')
      .select('id_canal')
      .where("h1.factura = ''")
      .andWhere("not h1.comprador = 'youmarket'")
      .limit(1)
      .getRawOne();
  }

  async getProvDataFromDb(codart: string): Promise<ProveedorDto> {
    return this.artDb
      .createQueryBuilder()
      .select('proveedor')
      .where('id_pais = 1')
      .andWhere('codart = :id', { id: codart })
      .getRawOne();
  }
}
