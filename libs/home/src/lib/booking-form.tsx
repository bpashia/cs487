import {
  Api,
  Booking,
  Connection,
  Customer,
  Flight,
  FlightClass,
  Price,
} from '@airline/airline-interfaces';
import {
  BrsCard,
  Divider,
  Grid,
  Loading,
  ReturnFlightTable,
  Summary,
  toCurrencyString,
  Typography,
  useEditableCardApi,
} from '@broc-ui';
import {
  activeCustomer,
  selectedBookings,
  selectedConnection,
  selectedReturnConnection,
  selectedReturnConnections,
} from '@login';
import { renderDate } from '@broc-ui';
import React from 'react';
import { useRecoilState } from 'recoil';
import { useAsync, useAsyncFn } from 'react-use';
import { Form, Formik } from 'formik';
import { BookingFields } from './booking-fields';
import { bookingSchema } from './booking.schema';

export const toConnectionSummaryFields = (
  connection: Connection,
  prices: Price[]
) => {
  console.log({ connection });
  if (!connection) {
    return null;
  }
  const summaryFields = connection.flights.map((flight) => {
    const price = prices.find((p) => p.flightNumber === flight.flightNumber);
    const specificPrice = flight.isFirstClass
      ? price.firstClassPrice
      : price.economyClassPrice;
    return [
      { label: 'Departure', value: flight.departureAirport },
      { label: 'Destination', value: flight.destinationAirport },
      {
        label: 'Flight Class',
        value: flight.isFirstClass
          ? FlightClass.FirstClass
          : FlightClass.EconomyClass,
      },
      { label: 'Price', value: toCurrencyString(Number(specificPrice)) },
      { label: 'Flight Date', value: renderDate(flight.flightDate) },
      { label: 'Departure Time', value: flight.departureTime },
      { label: 'Arrival Time', value: flight.arrivalTime },
    ];
  });
  return summaryFields;
};

export const BookingForm = () => {
  const cardApi = useEditableCardApi();
  const [currentActiveCustomer, setActiveCustomer] = useRecoilState<Customer>(
    activeCustomer
  );

  const [
    currentSelectedConnection,
    setCurrentSelectedConnection,
  ] = useRecoilState<Connection>(selectedConnection);

  const [currentReturn, setCurrentReturn] = useRecoilState<Connection>(
    selectedReturnConnection
  );
  const [returnConnections, setCurrentReturnConnections] = useRecoilState<
    Connection[]
  >(selectedReturnConnections);

  const [bookings, setSelectedBookings] = useRecoilState<Booking[]>(
    selectedBookings
  );

  const [postResult, addBooking] = useAsyncFn(
    async (booking: Booking, flights: Flight[]) => {
      const { data } = await Api.post<
        { booking: Booking; flights: Flight[] },
        Booking
      >(`api/local/bookings`, { booking, flights });
      return data;
    },
    []
  );

  const result = useAsync(async () => {
    if (!currentSelectedConnection) {
      return { summaryFields: [], returnSummaryFields: [] };
    }
    const { data } = await Api.get<Price[]>(`api/local/customers/prices`);
    //   console.log('PRICES',{data})
    const summaryFields = toConnectionSummaryFields(
      currentSelectedConnection,
      data
    );
    const returnSummaryFields = currentReturn
      ? toConnectionSummaryFields(currentReturn, data)
      : [];
    return { summaryFields, returnSummaryFields };
  }, [currentSelectedConnection, currentReturn]);
  console.log({ result });
  const onSubmit = (values, actions) => {
    const flights = currentReturn
      ? [...currentSelectedConnection.flights, ...currentReturn.flights]
      : currentSelectedConnection.flights;
    addBooking(values, flights);
    setSelectedBookings([...bookings, postResult.value]);
    cardApi.toggleEditMode();
  };
  const getBookingInit = () => {
    return bookingSchema.cast({
      email: currentActiveCustomer.email,
      flightClass: currentSelectedConnection.flights[0].isFirstClass
        ? FlightClass.FirstClass
        : FlightClass.EconomyClass,
    });
  };
  return result.loading || !result.value ? (
    <Loading />
  ) : (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <BrsCard
          title="Selected Flight"
          content={result.value.summaryFields.map((fields, index) => {
            return (
              <>
                {index ? <Divider /> : <div />}
                {fields.length > 1 && (
                  <Typography>Flight {index + 1}:</Typography>
                )}
                <Summary fields={fields} />
              </>
            );
          })}
        />
      </Grid>
      {currentReturn ? (
        <Grid item lg={12}>
          <BrsCard
            title="Return Flight"
            content={result.value.returnSummaryFields.map((fields, index) => {
              return (
                <>
                  {index ? <Divider /> : <div />}
                  <Summary fields={fields} />
                </>
              );
            })}
          />
        </Grid>
      ) : (
        <div />
      )}
      {returnConnections.length ? (
        <Grid item lg={12}>
          <ReturnFlightTable rows={returnConnections} />
        </Grid>
      ) : (
        <div />
      )}
      {currentSelectedConnection && (
        <Grid item lg={12}>
          <Formik<Booking>
            initialValues={getBookingInit()}
            onSubmit={onSubmit}
            validationSchema={bookingSchema}
            enableReinitialize={true}
          >
            <Form>
              <BookingFields />
            </Form>
          </Formik>
        </Grid>
      )}
    </Grid>
  );
};
