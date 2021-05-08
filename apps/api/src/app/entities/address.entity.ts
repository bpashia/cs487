import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm';
import { Address as IAddress } from '@airline/airline-interfaces';
import { Customer } from './customer.entity';

@Entity('address')
export class Address implements IAddress {
  @Index()
  @PrimaryGeneratedColumn()
  addressID: number;

  @Index()
  @PrimaryColumn('varchar', {
    nullable: false,
    length: 50,
  })
  email: string;

  @Index()
  @Column('varchar', {
    nullable: false,
    length: 100,
  })
  streetAddress: string;

  @Column('varchar', {
    nullable: false,
    length: 50,
  })
  city: string;

  @Column('varchar', {
    nullable: false,
    length: 20,
  })
  state: string;

  @Column('varchar', {
    nullable: false,
    length: 10,
  })
  zip: string;

  // @ManyToOne(() => Customer, (customer) => customer.email, {
  //   eager: true,
  // })
  // email: string;

  // @OneToMany(interfaces.BrsEntity.ContractCpiPayment, 'contract', {
  //   cascade: true
  // })
  // cpiPayments: interfaces.ContractCpiPayment[];

  // @OneToMany('Contact', 'contract')
  // contacts: interfaces.Contact[];
}
