export interface Airline {
  airlineCode: string;
  name: string;
  country: string;
}

export interface Airport {
  locIdentifier: string;
  name: string;
  country: string;
  state: string;
}

export interface Customer {
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  homeAirport: string;
}
export interface Address {
  addressID: number;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

export interface CreditCard {
  email: string;
  addressID: number;
  creditCardNumber: number;
  expirationDate: Date;
  securityCode: number;
}

export interface Booking {
  bookingID: number;
  flightClass: FlightClass;
  email: string;
  creditCardNumber: number;
}

export interface Flight {
  airlineCode: string;
  flightNumber: number;
  flightDate: Date;
  firstClassCapacity: number;
  economyClassCapacity: number;
  arrivalTime: string;
  departureTime: string;
  departureAirport: string;
  destinationAirport: string;
}
export interface Price {
  airlineCode: string;
  flightNumber: number;
  flightDate: Date;
  firstClassPrice: number;
  economyClassPrice: number;
}

export interface BookingFlight {
  bookingID: number;
  airlineCode: string;
  flightNumber: number;
  flightDate: Date;
}

export enum FlightClass {
  FirstClass = 'First',
  EconomyClass = 'Economy',
}

export const flightClasses = [FlightClass.FirstClass, FlightClass.EconomyClass];

export interface ApiResponse<T extends unknown = unknown> {
  error?: string;
  data?: T;
}

export function apiError(message: string): ApiResponse {
  console.error(`API ERROR: ${message}`);
  return { error: message };
}

// Build an API success response
export function apiSuccess<T extends unknown = unknown>(
  data: T = null
): ApiResponse<T> {
  return { data: data };
}

export interface AddressRequest {
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

export enum SortOption {
  SortByPrice = 'Sort by Price',
  SortByFlightLength = 'Sort By Flight Length',
}
export const sortOptions = [
  SortOption.SortByFlightLength,
  SortOption.SortByPrice,
];

export interface FlightSearch {
  departureAirport: string;
  destinationAirport: string;
  flightDate: Date;
  returnDate?: Date;
  price?: number;
  maxDays?: number;
  maxConnection?: number;
  sortOption?: SortOption;
}
export interface FlightWithClass extends Flight {
  isFirstClass: boolean;
}

export interface Connection {
  flights: FlightWithClass[];
  totalPrice: number;
}
