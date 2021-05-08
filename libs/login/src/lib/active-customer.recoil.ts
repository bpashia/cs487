import {
  Address,
  Booking,
  Connection,
  CreditCard,
  Customer,
  Flight,
} from '@airline/airline-interfaces';
import React from 'react';
import { atom } from 'recoil';

export const activeCustomer = atom<Customer>({
  key: 'activeCustomer', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const customerAddresses = atom<Address[]>({
  key: 'customerAddresses', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const customerCreditCards = atom<CreditCard[]>({
  key: 'customerCreditCards', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const editAddress = atom<Address>({
  key: 'editAddress', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const editCreditCard = atom<CreditCard>({
  key: 'editCreditCard', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const currentSearchResults = atom<{
  economyFlights: Flight[];
  firstClassFlights: Flight[];
}>({
  key: 'currentSearchResults', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const selectedReturnConnections = atom<Connection[]>({
  key: 'selectedReturnConnections', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const selectedConnection = atom<Connection>({
  key: 'selectedConnection', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const selectedReturnConnection = atom<Connection>({
  key: 'selectedReturnConnection', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const selectedBookings = atom<Booking[]>({
  key: 'selectedBookings', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
