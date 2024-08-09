import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  synchronize: false,
  name: 'articulos',
  withoutRowid: false,
  database: 'morph_bi',
})
export class Articulo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  id_pais: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  codart: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  proveedor: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  descripcion: string;

  @Column({
    type: 'double',
    nullable: false,
  })
  pventa: number;

  @Column({
    type: 'double',
    nullable: true,
  })
  pcompra: number;

  @Column({
    type: 'varchar',
    length: 1,
    nullable: true,
  })
  estado: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  observaciones: string;

  @Column({
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  coarpr: string;

  @Column({
    type: 'varchar',
    length: 4,
    nullable: true,
  })
  coduni: string;
}
