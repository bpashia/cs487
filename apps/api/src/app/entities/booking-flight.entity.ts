import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { BookingFlight as IBookingFlight } from '@airline/airline-interfaces';

@Entity('bookingflight')
export class BookingFlight implements IBookingFlight {
  @Index()
  @PrimaryColumn('int', {
    nullable: false,
    unsigned: true,
  })
  bookingID: number;

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
