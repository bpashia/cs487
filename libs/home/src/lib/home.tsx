import React from 'react';
import { activeCustomer } from '@login';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  BrsCard,
  Card,
  EditableCard,
  EditableCardProvider,
  Grid,
  Typography,
} from '@broc-ui';
import { useEditableCards } from './use-editables';
import {
  Flight,
  FlightSearch,
  FlightWithClass,
} from '@airline/airline-interfaces';
import { FlightSearchHelpers } from './flight-search.helpers';
import { Redirect } from 'react-router';
import { CustomerBookings } from './customer-bookings';

// const test = ()=>{
//   const flight1:FlightWithClass = {
//     airlineCode:'AA',
//     flightNumber:123,
//     flightDate: new Date('2021/5/3'),
//     departureAirport: 'MCI',
//     destinationAirport: 'MDW',
//     firstClassCapacity:10,
//     economyClassCapacity:10,
//     arrivalTime:'10:00:00',
//     departureTime:'8:00:00'
//   }
//   const flight2:FlightWithClass = {
//     airlineCode:'AA',
//     flightNumber:234,
//     flightDate: new Date('2021/5/3'),
//     departureAirport: 'MCI',
//     destinationAirport: 'LGA',
//     firstClassCapacity:10,
//     economyClassCapacity:10,
//     arrivalTime:'10:00:00',
//     departureTime:'8:00:00'
//   }
//   const flight3:FlightWithClass = {
//     airlineCode:'AA',
//     flightNumber:345,
//     flightDate: new Date('2021/5/3'),
//     departureAirport: 'LGA',
//     destinationAirport: 'MDW',
//     firstClassCapacity:10,
//     economyClassCapacity:10,
//     arrivalTime:'14:00:00',
//     departureTime:'12:00:00',
//     flightClass
//   }
//   const flightSearch:FlightSearch={departureAirport:'MCI',destinationAirport:'MDW', flightDate:new Date('2021/5/3')}
//   console.log({connections: FlightSearchHelpers.getConnectionsWithReturn(flightSearch,[flight1,flight2,flight3])})
// }

export const Home = () => {
  const currentActiveCustomer = useRecoilValueLoadable(activeCustomer);
  console.log({ currentActiveCustomer });
  const editableCards = useEditableCards();
  const {
    inEditMode,
    setInEditMode,
    toggleEditMode,
    getContent,
    icon,
    title,
  } = editableCards[2];
  console.log({ currentActiveCustomer });
  const editMode = { inEditMode, setInEditMode, toggleEditMode };
  return (
    <div>
      {currentActiveCustomer.state === 'hasValue' &&
      !currentActiveCustomer.contents ? (
        <Typography variant="h4">
          Session timed out. Please log back in...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6}>
            <EditableCard {...editableCards[0]} />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <EditableCard {...editableCards[1]} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <CustomerBookings />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <EditableCardProvider editMode={editMode}>
              <BrsCard icon={icon} title={title} content={getContent()} />
            </EditableCardProvider>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Home;
