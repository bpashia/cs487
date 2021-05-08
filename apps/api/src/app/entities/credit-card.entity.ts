import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CreditCard as ICreditCard } from '@airline/airline-interfaces';

@Entity('creditcard')
export class CreditCard implements ICreditCard {
  @Index()
  @PrimaryColumn('varchar', {
    nullable: false,
    length: 50,
  })
  email: string;

  // @Index()
  @Column('int', {
    nullable: false,
    unsigned: true,
  })
  addressID: number;

  // @Index()
  @PrimaryColumn('int', {
    nullable: false,
    unsigned: true,
  })
  creditCardNumber: number;

  // @Index()
  @Column('date', {
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  expirationDate: Date;

  @Column('int', {
    nullable: false,
    unsigned: true,
  })
  securityCode: number;

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
