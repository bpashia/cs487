import {
  Address,
  Api,
  CreditCard,
  Customer,
} from '@airline/airline-interfaces';
import { Delete, IconButton, Loading, Tooltip, Typography } from '@broc-ui';
import { activeCustomer, customerAddresses, customerCreditCards } from '@login';

import React from 'react';
import { useAsync, useAsyncFn } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsyncFn';
import { useRecoilState } from 'recoil';

export const CreditCardSummary = () => {
  const [
    currentCustomerAddresses,
    setCurrentCustomerAddresses,
  ] = useRecoilState<Address[]>(customerAddresses);
  const [currentActiveCustomer, setActiveCustomer] = useRecoilState<Customer>(
    activeCustomer
  );
  const [currentCustomerPayments, setCurrentCustomerPayments] = useRecoilState<
    CreditCard[]
  >(customerCreditCards);
  const [creditCards, getCreditCards] = useAsyncFn<
    () => Promise<CreditCard[]>
  >(async () => {
    const { data } = await Api.get<null, CreditCard[]>(
      `api/local/customers/credit-cards/${currentActiveCustomer.email}`,
      null
    );
    return data;
  }, [currentActiveCustomer]);
  React.useEffect(() => {
    getCreditCards();
  }, [getCreditCards, currentActiveCustomer]);
  React.useEffect(() => {
    setCurrentCustomerPayments(creditCards.value);
  }, [setCurrentCustomerPayments, creditCards]);

  const [deleted, deleteAddress] = useAsyncFn(
    async (creditCardNumber: number) => {
      const { data } = await Api.put<
        { creditCardNumber: number; email: string },
        string
      >(`api/local/credit-cards/delete`, {
        creditCardNumber,
        email: currentActiveCustomer.email,
      });
      await getCreditCards();
      return data;
    },
    [currentActiveCustomer]
  );
  return creditCards.loading ? (
    <Loading />
  ) : creditCards.value && creditCards.value.length ? (
    <>
      {creditCards.value.map((creditCard) => (
        <Typography key={creditCard.creditCardNumber}>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => {
                deleteAddress(creditCard.creditCardNumber);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
          Credit Card ending in{' '}
          {String(creditCard.creditCardNumber).slice(
            String(creditCard.creditCardNumber).length - 5
          )}
        </Typography>
      ))}
    </>
  ) : (
    <Typography>No existing addresses</Typography>
  );
};
