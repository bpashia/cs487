import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address, Customer, Flight, Price } from '../entities';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customersRepository.find();
  }

  findOne(email: string): Promise<Customer> {
    return this.customersRepository.findOne({ email });
  }

  findOneByEmail(email: string): Promise<Customer> {
    return this.customersRepository.findOne({ email });
  }

  async insert(customer: Partial<Customer>): Promise<Customer> {
    return await this.customersRepository.save({
      ...customer,
    });
  }

  async getCustomerAddresses(email: string): Promise<Address[]> {
    return await this.customersRepository.query(
      `SELECT * FROM address WHERE email = '${email}';`
    );
  }

  async getCustomerCreditCards(email: string): Promise<Address[]> {
    return await this.customersRepository.query(
      `SELECT * FROM creditcard WHERE email = '${email}';`
    );
  }
  async customerLogin(email: string): Promise<Customer> {
    const customer = await this.customersRepository.query(
      `SELECT * FROM customer WHERE email = '${email}';`
    );
    return customer;
  }

  async getCustomerFlights(email: string): Promise<Flight[]> {
    const flights = await this.customersRepository.query(
      `with customer_bookings ("airlineCode","flightNumber","flightDate") as
(select bookingflight."airlineCode",bookingflight."flightNumber",bookingflight."flightDate" from booking,
bookingflight 
where booking."bookingID"=bookingflight."bookingID" and booking.email = '${email}')
select flight.* 
from customer_bookings,flight
WHERE flight."airlineCode" = customer_bookings."airlineCode"
AND flight."flightNumber" = customer_bookings."flightNumber" 
AND flight."flightDate" = customer_bookings."flightDate";`
    );
    return flights;
  }

  async getAvailableFlightPrices(): Promise<Price[]> {
    const prices = await this.customersRepository.query(
      `WITH flight_booking_count ("airlineCode","flightNumber","flightDate")AS
(SELECT flight."airlineCode",flight."flightNumber",flight."flightDate",COUNT(bookingflight."bookingID")
FROM flight LEFT JOIN bookingflight ON flight."airlineCode" = bookingflight."airlineCode"
AND flight."flightNumber" = bookingflight."flightNumber" 
AND flight."flightDate" = bookingflight."flightDate"
GROUP BY flight."flightNumber",flight."airlineCode",flight."flightDate"),
available_flights ("airlineCode","flightNumber","flightDate")AS
(SELECT flight."airlineCode",flight."flightNumber",flight."flightDate"
FROM flight,flight_booking_count
WHERE flight."airlineCode" = flight_booking_count."airlineCode"
AND flight."flightNumber" = flight_booking_count."flightNumber" 
AND flight."flightDate" = flight_booking_count."flightDate"
AND flight_booking_count.count < flight."economyClassCapacity" OR flight_booking_count.count<flight."firstClassCapacity"
GROUP BY flight."flightNumber",flight."airlineCode",flight."flightDate")
SELECT price.*
FROM price,available_flights
WHERE price."airlineCode" = available_flights."airlineCode"
AND price."flightNumber" = available_flights."flightNumber" 
AND price."flightDate" = available_flights."flightDate";`
    );
    return prices;
  }

  async getAvailableFlights(): Promise<{
    economyFlights: Flight[];
    firstClassFlights: Flight[];
  }> {
    const economyFlights = await this.customersRepository
      .query(`WITH flight_booking_count ("airlineCode","flightNumber","flightDate") AS
(SELECT flight."airlineCode",flight."flightNumber",flight."flightDate",COUNT(bookingflight."bookingID")
FROM flight LEFT JOIN bookingflight ON flight."airlineCode" = bookingflight."airlineCode"
AND flight."flightNumber" = bookingflight."flightNumber" 
AND flight."flightDate" = bookingflight."flightDate"
GROUP BY flight."flightNumber",flight."airlineCode",flight."flightDate")
SELECT flight.*
FROM flight,flight_booking_count
WHERE flight."airlineCode" = flight_booking_count."airlineCode"
AND flight."flightNumber" = flight_booking_count."flightNumber" 
AND flight."flightDate" = flight_booking_count."flightDate"
AND flight_booking_count.count < flight."economyClassCapacity";`);
    const firstClassFlights = await this.customersRepository
      .query(`WITH flight_booking_count ("airlineCode","flightNumber","flightDate") AS
(SELECT flight."airlineCode",flight."flightNumber",flight."flightDate",COUNT(bookingflight."bookingID")
FROM flight LEFT JOIN bookingflight ON flight."airlineCode" = bookingflight."airlineCode"
AND flight."flightNumber" = bookingflight."flightNumber" 
AND flight."flightDate" = bookingflight."flightDate"
GROUP BY flight."flightNumber",flight."airlineCode",flight."flightDate")
SELECT flight.*
FROM flight,flight_booking_count
WHERE flight."airlineCode" = flight_booking_count."airlineCode"
AND flight."flightNumber" = flight_booking_count."flightNumber" 
AND flight."flightDate" = flight_booking_count."flightDate"
AND flight_booking_count.count < flight."firstClassCapacity";`);
    return { economyFlights, firstClassFlights };
  }

  async update(
    customerEmail: string,
    customer: Partial<Customer>
  ): Promise<Customer> {
    const entity = await this.customersRepository.findOneOrFail({
      email: customerEmail,
    });

    if (!entity) {
      throw 'Customer not found';
    }
    const { email, ...changes } = customer;
    const result = await this.customersRepository.save({
      ...entity,
      ...changes,
    });

    return result;
  }

  async delete(id: string): Promise<string> {
    await this.customersRepository.delete(id);
    return id;
  }

  async softDelete(id: string): Promise<string> {
    await this.customersRepository.softDelete(id);
    return id;
  }
}
