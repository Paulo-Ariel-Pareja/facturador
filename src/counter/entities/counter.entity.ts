import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false, name: 'latest_fc', withoutRowid: false })
export class Counter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  fc_number: number;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  id_mercadopago: string;
}
