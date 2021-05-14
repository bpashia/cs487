import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';
import { useAsyncFn } from 'react-use';

import {
  Address,
  AddressRequest,
  Api,
  CreditCard,
} from '@airline/airline-interfaces';
import { Customer } from '@airline/airline-interfaces';
import { Redirect } from 'react-router';
import { Snackbar, useEditableCardApi } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import {
  activeCustomer,
  customerAddresses,
  customerCreditCards,
  selectedCreditCard,
} from '@login';
import { creditCardSchema } from './credit-card.schema';
import { CreditCardFields } from './credit-card-fields';

export const CreditCardForm = () => {
  const [currentActiveCustomer, setActiveCustomer] = useRecoilState<Customer>(
    activeCustomer
  );
  const [
    currentSelectedCreditCard,
    setSelectedCreditCard,
  ] = useRecoilState<CreditCard>(selectedCreditCard);
  const creditCardInit = currentSelectedCreditCard
    ? creditCardSchema.cast(currentSelectedCreditCard)
    : creditCardSchema.cast({
        email: currentActiveCustomer.email,
      });
  const cardApi = useEditableCardApi();
  const [result, addCreditCard] = useAsyncFn(async (values: CreditCard) => {
    const { data } = await Api.post<CreditCard, CreditCard>(
      `api/local/credit-cards`,
      values
    );
    return data;
  }, []);
  const [
    currentCustomerCreditCards,
    setCurrentCustomerCreditCards,
  ] = useRecoilState<CreditCard[]>(customerCreditCards);
  const [customerResult, getCreditCards] = useAsyncFn(async (email: string) => {
    const { data } = await Api.get<CreditCard[]>(
      `api/local/customers/credit-cards/${email}`
    );
    return data;
  }, []);
  const [updateResult, updateCreditCard] = useAsyncFn(
    async (initial: number, values: CreditCard) => {
      console.log({ currentSelectedCreditCard });
      const { data } = await Api.put<CreditCard, CreditCard>(
        `api/local/credit-cards/${initial}`,
        values
      );
      return data;
    },
    []
  );
  const onSubmit = async (values, actions) => {
    console.log('HERE');
    console.log({ currentSelectedCreditCard });
    const result = currentSelectedCreditCard
      ? await updateCreditCard(
          currentSelectedCreditCard.creditCardNumber,
          values
        )
      : await addCreditCard(values);
    await getCreditCards(currentActiveCustomer.email);
    setSelectedCreditCard(null);
    actions.setSubmitting(false);
    if (cardApi) {
      cardApi.toggleEditMode();
    }
  };
  const onCancel = () => {
    setSelectedCreditCard(null);
    cardApi.toggleEditMode();
  };
  React.useEffect(() => {
    if (customerResult.value) {
      setCurrentCustomerCreditCards(customerResult.value);
    }
  }, [customerResult, setCurrentCustomerCreditCards]);

  return (
    <Formik<CreditCard>
      initialValues={creditCardInit}
      onSubmit={onSubmit}
      validationSchema={creditCardSchema}
      enableReinitialize={true}
    >
      <Form>
        <CreditCardFields toggleEditMode={onCancel} />
      </Form>
    </Formik>
  );
};