export const CONNECTION_NAME = 'default';
export const DATABASE_NAME = 'Airline';
export const API_PATH = 'local';

export enum ProviderToken {
  CustomerService = 'CustomerService',
  AddressService = 'AddressService',
  CreditCardService = 'CreditCardService',
  BookingService = 'BookingService',
}

import {
  Customer,
  Flight,
  Airline,
  Airport,
  Booking,
  BookingFlight,
  Address,
  CreditCard,
} from './entities';

export const entities = [
  Customer,
  Flight,
  Airline,
  Airport,
  Booking,
  BookingFlight,
  Address,
  CreditCard,
];
