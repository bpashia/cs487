import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Flight as IFlight } from '@airline/airline-interfaces';

@Entity('flight')
export class Flight implements IFlight {
  @Index()
  @Column('char', {
    nullable: false,
    length: 3,
  })
  departureAirport: string;

  @Column('char', {
    nullable: false,
    length: 3,
  })
  destinationAirport: string;

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

  @Column('int', {
    nullable: false,
    unsigned: true,
  })
  firstClassCapacity: number;

  @Column('int', {
    nullable: false,
    unsigned: true,
  })
  economyClassCapacity: number;

  @Column('char', {
    nullable: false,
    length: 8,
  })
  arrivalTime: string;

  @Column('char', {
    nullable: false,
    length: 8,
  })
  departureTime: string;

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
