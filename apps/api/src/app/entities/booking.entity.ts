import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking as IBooking, FlightClass } from '@airline/airline-interfaces';

@Entity('booking')
export class Booking implements IBooking {
  @Index()
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  bookingID: number;

  // @Index()
  @Column('enum', {
    nullable: false,
    enum: FlightClass,
  })
  flightClass: FlightClass;

  // @Index()
  @Column('varchar', {
    nullable: false,
    length: 50,
  })
  email: string;

  // @Index()
  @Column('int', {
    nullable: false,
    unsigned: true,
  })
  creditCardNumber: number;

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
