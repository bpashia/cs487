import * as yup from 'yup';
import { Booking, flightClasses } from '@airline/airline-interfaces';

const bookingShape = {
  bookingID: yup.number().nullable(),
  creditCardNumber: yup.number().required(),
  email: yup.string().ensure().required(),
  flightClass: yup.mixed().oneOf(flightClasses).required(),
};

export const bookingSchema = yup.object<Booking>().shape(bookingShape);
