import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking, BookingFlight, Flight } from '../entities';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(BookingFlight)
    private bookingFlightRepository: Repository<BookingFlight>
  ) {}

  findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async find(
    email: string
  ): Promise<{ bookings: Booking[]; bookingFlights: BookingFlight[] }> {
    const bookings = await this.bookingRepository.find({ email });
    const bookingIds = bookings.map((b) => b.bookingID);
    const allBookingFlights = await this.bookingFlightRepository.find();
    const bookingFlights = allBookingFlights.filter((bookingFlight) =>
      bookingIds.includes(bookingFlight.bookingID)
    );
    return { bookings, bookingFlights };
  }

  async insert({
    booking,
    flights,
  }: {
    booking: Partial<Booking>;
    flights: Flight[];
  }): Promise<Booking> {
    const savedBooking = await this.bookingRepository.save({
      ...booking,
    });
    const bookingFlightsToSave: BookingFlight[] = flights.map((flight) => ({
      bookingID: savedBooking.bookingID,
      airlineCode: flight.airlineCode,
      flightNumber: flight.flightNumber,
      flightDate: flight.flightDate,
    }));
    const bookingFlights = await this.bookingFlightRepository.save(
      bookingFlightsToSave
    );
    return savedBooking;
  }

  // async update(
  //   id: number,
  //   booking: Partial<Booking>
  // ): Promise<Booking> {
  //   const entity = await this.bookingRepository.findOneOrFail({
  //     bookingID: id,
  //   });

  //   if (!entity) {
  //     throw 'Booking not found';
  //   }
  //   const { bookingID, ...changes } = booking;
  //   const result = await this.bookingRepository.save({
  //     ...entity,
  //     ...changes,
  //   });

  //   return result;
  // }

  async delete(bookingID: number): Promise<number> {
    await this.bookingFlightRepository.delete({ bookingID });
    await this.bookingRepository.delete({ bookingID });

    return bookingID;
  }
}
