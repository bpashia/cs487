import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Price as IPrice } from '@airline/airline-interfaces';

@Entity('price')
export class Price implements IPrice {
  @Index()
  @PrimaryColumn('char', {
    nullable: false,
    length: 2,
  })
  airlineCode: string;

  // @Index()
  @PrimaryColumn('int', {
    nullable: false,
    unsigned: true,
  })
  flightNumber: number;

  // @Index()
  @PrimaryColumn('date', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  flightDate: Date;

  @Column('float', {
    nullable: false,
    unsigned: true,
  })
  economyClassPrice: number;

  @Column('numeric', {
    nullable: false,
    unsigned: true,
    precision: 2,
  })
  firstClassPrice: number;

  // @ManyToOne(interfaces.BrsEntity.CpiPolicyTier, 'contract', {
  //   eager: true
  // })
  // cpiPolicyTier: interfaces.CpiPolicyTier;

  // @OneToMany(interfaces.BrsEntity.ContractCpiPayment, 'contract', {
  //   cascade: true
  // })
  // cpiPayments: interfaces.ContractCpiPayment[];

  // @OneToMany('Contact', 'contract')
  // contacts: interfaces.Contact[];
}
