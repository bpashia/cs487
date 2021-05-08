import * as yup from 'yup';
import {
  AddressRequest,
  sortOptions,
  SortOption,
  FlightSearch,
} from '@airline/airline-interfaces';

const flightSearchShape = {
  departureAirport: yup.string().ensure().required(),
  destinationAirport: yup.string().ensure().required(),
  flightDate: yup.date().required(),
  returnDate: yup.date().nullable().default(null),
  price: yup.number().nullable(),
  maxDays: yup.number().nullable(),
  maxConnection: yup.number().nullable(),
  sortOption: yup
    .mixed()
    .oneOf(sortOptions)
    .default(SortOption.SortByPrice)
    .required(),
};

export const flightSearchSchema = yup
  .object<FlightSearch>()
  .shape(flightSearchShape);
