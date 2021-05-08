import React from 'react';
import { useFormikContext, Field } from 'formik';
import { Box, Button, Paper } from '@material-ui/core';
import {
  FormLayout,
  FormRow,
  FormItem,
  NavigateNextIcon,
  Grid,
  Card,
  CancelIcon,
  Option,
  AutocompleteField,
  datePickerField,
  CurrencyField,
  useEditableCardApi,
} from '@broc-ui';
import { textField } from '@broc-ui';
import { TextField } from 'formik-material-ui';
import {
  Address,
  AddressRequest,
  Booking,
  Connection,
  CreditCard,
  FlightSearch,
  sortOptions,
} from '@airline/airline-interfaces';
import { useRecoilState } from 'recoil';
import {
  customerAddresses,
  customerCreditCards,
  selectedConnection,
  selectedReturnConnection,
  selectedReturnConnections,
} from '@login';

export const BookingFields = () => {
  const cardApi = useEditableCardApi();
  const [paymentOptions, setPaymentOptions] = useRecoilState<CreditCard[]>(
    customerCreditCards
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

  const {
    submitForm,
    isSubmitting,
    errors,
    values,
    setFieldValue,
  } = useFormikContext<Booking>();

  const getOptions = () => {
    return paymentOptions.map((option) => ({
      label: `Credit Card ending in ${String(option.creditCardNumber).slice(
        String(option.creditCardNumber).length - 5
      )}`,
      value: option.creditCardNumber,
    }));
  };
  const onCancel = () => {
    setCurrentSelectedConnection(null);
    setCurrentReturn(null);
    setCurrentReturnConnections(null);
    cardApi.toggleEditMode();
  };
  return (
    <>
      {/* <div>{JSON.stringify(values,null,2)}</div>
        <div>{JSON.stringify(errors,null,2)}</div> */}
      <FormLayout>
        <FormRow>
          {paymentOptions.length && (
            <FormItem xs={6} md={6} lg={6}>
              <AutocompleteField
                name="creditCardNumber"
                label="Payment Method"
                options={getOptions()}
              />
            </FormItem>
          )}
        </FormRow>
        <FormRow>
          <FormItem>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              //onClick={submitForm}
              startIcon={<NavigateNextIcon />}
              type="submit"
            >
              Book
            </Button>
          </FormItem>
          <FormItem>
            <Button
              variant="outlined"
              color="primary"
              disabled={isSubmitting}
              onClick={onCancel}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </FormItem>
        </FormRow>
      </FormLayout>
    </>
  );
};
