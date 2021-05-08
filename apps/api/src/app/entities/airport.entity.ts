import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Airport as IAirport } from '@airline/airline-interfaces';

@Entity('airport')
export class Airport implements IAirport {
  @Index()
  @PrimaryColumn('char', {
    nullable: false,
    length: 3,
  })
  locIdentifier: string;

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

  @Column('varchar', {
    nullable: false,
    length: 20,
  })
  state: string;

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
