import React from 'react';
import {
  BorrowersIcon,
  useEditable,
  createEditables,
  Box,
  Typography,
  IconButton,
  ClaimIcon,
  SettlementIcon,
  PaymentIcon,
  MailIcon,
  Button,
} from '@broc-ui';
import { CreditCard, Flight, House, Money } from '@material-ui/icons';
import { AddressForm } from './address-forms';
import { AddressSummary } from './address-summary';
import { CreditCardForm } from './credit-card-forms';
import { CreditCardSummary } from './credit-card-summary';
import { BookingForm } from './booking-form';
import { FlightSearchForm } from './flight-search-form';

export const { config, editables } = createEditables({
  addresses: {
    icon: <House />,
    title: 'Customer Addresses',
    //Status: ContractStatus,
    content: { editor: AddressForm, summary: AddressSummary },
  },
  creditCards: {
    icon: <CreditCard />,
    title: 'Customer Payment Methods',
    //Status: ContractStatus,
    content: { editor: CreditCardForm, summary: CreditCardSummary },
  },
  flightSearch: {
    icon: <Flight />,
    title: 'Search Flights',
    //Status: ContractStatus,
    content: { editor: BookingForm, summary: FlightSearchForm },
  },
});

export const useEditableCards = () => {
  return editables.map(useEditable);
};
