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
} from '@broc-ui';
import { textField } from '@broc-ui';
import { TextField } from 'formik-material-ui';
import {
  Address,
  AddressRequest,
  CreditCard,
} from '@airline/airline-interfaces';
import { useRecoilState } from 'recoil';
import { customerAddresses } from '@login';
export const CreditCardFields = ({
  toggleEditMode,
}: {
  toggleEditMode: () => void;
}) => {
  const [currentCustomerAddresses, setCustomerAddresses] = useRecoilState<
    Address[]
  >(customerAddresses);
  const {
    submitForm,
    isSubmitting,
    errors,
    values,
    setFieldValue,
  } = useFormikContext<CreditCard>();
  const options: Option<number>[] = currentCustomerAddresses.map((address) => ({
    label: `${address.streetAddress}, ${address.city}, ${address.state} ${address.zip}`,
    value: address.addressID,
  }));
  console.log({ options });
  return (
    <>
      {/* <div>{JSON.stringify(values,null,2)}</div>
        <div>{JSON.stringify(errors,null,2)}</div> */}
      <FormLayout>
        <FormRow>
          <FormItem xs={12} md={12} lg={12}>
            <AutocompleteField
              name="addressID"
              label="Credit Card Address"
              options={options}
            />
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem xs={12} md={12} lg={12}>
            <Field
              {...textField}
              type="number"
              name="creditCardNumber"
              label="Credit Card Number"
            />
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem xs={6} md={6} lg={6}>
            <Field
              {...datePickerField}
              name="expirationDate"
              label="Expiration Date"
            />
          </FormItem>
          <FormItem xs={6} md={6} lg={6}>
            <Field
              {...textField}
              type="number"
              name="securityCode"
              label="Security Code"
            />
          </FormItem>
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
              Submit
            </Button>
          </FormItem>
          <FormItem>
            <Button
              variant="outlined"
              color="primary"
              disabled={isSubmitting}
              onClick={toggleEditMode}
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
