import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Customer as ICustomer } from '@airline/airline-interfaces';

@Entity('customer')
export class Customer implements ICustomer {
  @Index()
  @PrimaryColumn('varchar', {
    nullable: false,
    length: 50,
  })
  email: string;

  // @Index()
  @Column('varchar', {
    nullable: false,
    length: 20,
  })
  firstName: string;

  // @Index()
  @Column('varchar', {
    nullable: false,
    length: 20,
  })
  lastName: string;

  // @Index()
  @Column('varchar', {
    nullable: true,
    length: 20,
  })
  middleName: string;

  @Column('char', {
    nullable: true,
    length: 3,
  })
  homeAirport: string;

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
