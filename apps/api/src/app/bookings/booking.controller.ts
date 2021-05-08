import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import { BookingService } from './booking.service';

import { ProviderToken, API_PATH } from '../api-lib.constants';
import { Booking, BookingFlight, Flight } from '../entities';
import { ApiResponse, apiSuccess } from '@airline/airline-interfaces';

@Controller(`${API_PATH}/bookings`)
export class BookingController {
  constructor(
    @Inject(ProviderToken.BookingService)
    private bookingService: BookingService
  ) {}

  @Get()
  async getAll(): Promise<ApiResponse<Booking[]>> {
    // this.logger.info('QUERY in FindAll Creditors', { query })
    const addresses = await this.bookingService.findAll();
    // this.logger.info('findAll result', creditors)
    return apiSuccess(addresses);
  }

  @Post()
  async create(
    @Body() booking: { data: { booking: Partial<Booking>; flights: Flight[] } }
  ): Promise<ApiResponse<Booking>> {
    console.log('controller create', { booking });
    const created = await this.bookingService.insert(booking.data);
    console.log('created', created);
    return apiSuccess(created);
  }

  // @Put()
  // async update(

  //   @Body() booking: { data: Partial<Booking> }
  // ): Promise<ApiResponse<Booking>> {
  //   console.log('updating address', { addressID, address });
  //   const saved = await this.addressService.update({email:booking.data.email, bookingNumber: booking.data.bookingNumber}, address.data);

  //   return apiSuccess(saved);
  // }

  @Get(':email')
  async getCustomerBookings(
    @Param('email') email: string
  ): Promise<
    ApiResponse<{ bookings: Booking[]; bookingFlights: BookingFlight[] }>
  > {
    const bookings = await this.bookingService.find(email);

    return apiSuccess(bookings);
  }

  @Put('delete')
  async delete(
    @Body()
    booking: {
      data: { bookingID: number };
    }
  ): Promise<ApiResponse<string>> {
    const removed = await this.bookingService.delete(booking.data.bookingID);
    return apiSuccess(String(removed));
  }
}
