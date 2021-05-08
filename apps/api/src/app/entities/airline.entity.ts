import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Airline as IAirline } from '@airline/airline-interfaces';

@Entity('airline')
export class Airline implements IAirline {
  @Index()
  @PrimaryColumn('char', {
    nullable: false,
    length: 2,
  })
  airlineCode: string;

  // @Index()
  @Column('varchar', {
    nullable: false,
    length: 30,
  })
  country: string;

  // @Index()
  @Column('varchar', {
    nullable: false,
    length: 50,
  })
  name: string;

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
