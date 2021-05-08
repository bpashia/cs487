import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './addresses/address.module';
import { entities } from './api-lib.constants';
import { BookingModule } from './bookings/booking.module';
import { CreditCardModule } from './credit-cards/credit-card.module';
import { CustomerModule } from './customers/customer.module';
import { EntitiesModule } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'Airline',
      synchronize: false,
      entities,
      subscribers: ['src/**.module/*-subscriber.ts'],
      migrations: ['src/migrations/*.ts'],
    }),
    CustomerModule,
    AddressModule,
    EntitiesModule,
    CreditCardModule,
    BookingModule,
  ],
})
export class ApiLibsModule {}
