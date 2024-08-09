import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false, name: 'vweb', withoutRowid: false })
export class Web {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  comprador: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  apodo: string;

  @Column({
    type: 'varchar',
    length: 5,
    nullable: true,
  })
  tipo_documento: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  documento: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  telefono: string;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: true,
  })
  destino: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  direccion: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  informacion_adicional: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  ciudad: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  provincia: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
  })
  codigo_postal: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  canal: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  id_canal: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  fecha_compra: string;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  id_mercadopago: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  fecha_pago: string;

  @Column({
    type: 'varchar',
    length: 8,
    nullable: true,
  })
  codigo: string;

  @Column({
    type: 'varchar',
    length: 90,
    nullable: true,
  })
  descripcion: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  cantidad: number;

  @Column({
    type: 'double',
    nullable: true,
  })
  sub_total: number;

  @Column({
    type: 'double',
    nullable: true,
  })
  descuento_compra: number;

  @Column({
    type: 'double',
    nullable: true,
  })
  costo_envio: number;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: true,
  })
  tracking_code: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  sucursal: string;

  @Column({
    type: 'varchar',
    length: 2,
    nullable: true,
  })
  impreso: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  estado_pedido: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  fecha_estado: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  factura: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: true,
  })
  id_cliente: string;
}
