import {
  Api,
  Booking,
  BookingFlight,
  Customer,
  Flight,
} from '@airline/airline-interfaces';
import {
  BrsCard,
  Delete,
  IconButton,
  renderDate,
  Tooltip,
  Typography,
} from '@broc-ui';
import { activeCustomer, selectedBookings } from '@login';
import { Book } from '@material-ui/icons';
import { differenceInDays } from 'date-fns';
import React from 'react';
import { useAsyncFn } from 'react-use';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bookingSchema } from './booking.schema';

const getFlightsByBooking = (bookingInfo: {
  flights: Flight[];
  bookings: Booking[];
  bookingFlights: BookingFlight[];
}): { booking: Booking; flights: Flight[] }[] => {
  return bookingInfo.bookings.map((booking) => {
    const bookingFlights = bookingInfo.bookingFlights.filter(
      (bf) => bf.bookingID === booking.bookingID
    );
    const flights: Flight[] = bookingFlights.reduce((acc, current) => {
      const flight = bookingInfo.flights.find(
        (f) =>
          f.airlineCode === current.airlineCode &&
          f.flightNumber === current.flightNumber
      );
      if (flight) {
        return [...acc, flight];
      }
      return acc;
    }, []);
    return { booking, flights };
  });
};

export const CustomerBookings = () => {
  const currentCustomer = useRecoilValue<Customer>(activeCustomer);
  const [currentBookings, setSelectedBookings] = useRecoilState<Booking[]>(
    selectedBookings
  );
  const [customerResult, getCustomerBookings] = useAsyncFn(
    async (email: string) => {
      const { data: flights } = await Api.get<Flight[]>(
        `api/local/customers/flights/${email}`
      );
      const { data: bookingsAndBookingFlights } = await Api.get<{
        bookings: Booking[];
        bookingFlights: BookingFlight[];
      }>(`api/local/bookings/${email}`);

      return { ...bookingsAndBookingFlights, flights };
    },
    [currentBookings]
  );

  const [deleted, deleteBooking] = useAsyncFn(
    async (bookingID: number) => {
      const { data } = await Api.put<{ bookingID: number }, string>(
        `api/local/bookings/delete`,
        {
          bookingID,
        }
      );
      await getCustomerBookings(currentCustomer.email);
      return data;
    },
    [currentCustomer]
  );
  React.useEffect(() => {
    if (currentCustomer) {
      console.log('1');
      getCustomerBookings(currentCustomer.email);
    }
  }, [currentCustomer, getCustomerBookings, currentBookings]);
  // React.useEffect(() => {
  //   if (customerResult.value && customerResult.value.bookings.length!=) {
  //     setSelectedBookings(customerResult.value.bookings);
  //   }
  // }, [customerResult, setSelectedBookings]);

  const bookings = customerResult.value
    ? getFlightsByBooking(customerResult.value)
    : [];
  console.log({ bookings, result: customerResult.value });
  return (
    <BrsCard
      icon={<Book />}
      title={'Customer Bookings'}
      content={bookings.map((booking, index) => (
        <>
          <Typography key={booking.booking.bookingID}>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  deleteBooking(booking.booking.bookingID);
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
            Booking {index + 1}:
          </Typography>
          {booking.flights.map((flight) => (
            <Typography key={flight.flightNumber}>{`${
              flight.departureAirport
            }  to  ${flight.destinationAirport} on ${renderDate(
              flight.flightDate
            )}`}</Typography>
          ))}
        </>
      ))}
    />
  );
};
