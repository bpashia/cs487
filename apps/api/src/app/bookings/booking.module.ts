import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { ProviderToken } from '../api-lib.constants';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking, BookingFlight } from '../entities';

const providers = [
  {
    provide: ProviderToken.BookingService,
    useClass: BookingService,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([Booking, BookingFlight])],
  controllers: [BookingController],
  providers,
  exports: providers,
})
export class BookingModule {}
