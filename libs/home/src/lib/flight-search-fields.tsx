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
} from '@broc-ui';
import { textField } from '@broc-ui';
import { TextField } from 'formik-material-ui';
import {
  Address,
  AddressRequest,
  CreditCard,
  FlightSearch,
  sortOptions,
} from '@airline/airline-interfaces';
import { useRecoilState } from 'recoil';
import { customerAddresses } from '@login';
export const FlightSearchFields = () => {
  const {
    submitForm,
    isSubmitting,
    errors,
    values,
    setFieldValue,
  } = useFormikContext<FlightSearch>();
  const options: Option<string>[] = sortOptions.map((option) => ({
    label: option.toString(),
    value: option,
  }));
  return (
    <>
      {/* <div>{JSON.stringify(values, null, 2)}</div>
      <div>{JSON.stringify(errors, null, 2)}</div> */}
      <FormLayout>
        <FormRow>
          <FormItem xs={3} md={3} lg={3}>
            <Field
              {...textField}
              name="departureAirport"
              label="From (Airport Code)"
              required
            />
          </FormItem>
          <FormItem xs={3} md={3} lg={3}>
            <Field
              {...textField}
              name="destinationAirport"
              label="To (Airport Code)"
              required
            />
          </FormItem>
          <FormItem xs={3} md={3} lg={3}>
            <Field
              {...datePickerField}
              name="flightDate"
              label="Flight Date"
              required
            />
          </FormItem>
          <FormItem xs={3} md={3} lg={3}>
            <Field {...datePickerField} name="returnDate" label="Return Date" />
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem xs={3} md={3} lg={3}>
            <CurrencyField name="price" label="Max Price" />
          </FormItem>
          <FormItem xs={3} md={3} lg={3}>
            <Field
              {...textField}
              type="number"
              name="maxDays"
              label="Maximum Days Until Return"
            />
          </FormItem>
          <FormItem xs={3} md={3} lg={3}>
            <Field
              {...textField}
              type="number"
              name="maxConnection"
              label="Maximum Number of Connections"
            />
          </FormItem>
          <FormItem xs={3} md={3} lg={3}>
            <Box paddingTop={2}>
              <AutocompleteField
                name="sortOption"
                label="Sort By"
                options={options}
              />
            </Box>
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
        </FormRow>
      </FormLayout>
    </>
  );
};
