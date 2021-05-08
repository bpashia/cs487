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
} from '@broc-ui';
import { textField } from '@broc-ui';
import { TextField } from 'formik-material-ui';
import { AddressRequest } from '@airline/airline-interfaces';
export const AddressFields = ({
  toggleEditMode,
}: {
  toggleEditMode: () => void;
}) => {
  const {
    submitForm,
    isSubmitting,
    errors,
    values,
  } = useFormikContext<AddressRequest>();
  return (
    <>
      {/* <div>{JSON.stringify(values,null,2)}</div> */}
      <FormLayout>
        <FormRow>
          <FormItem xs={12} md={12} lg={12}>
            <Field {...textField} name="streetAddress" label="Street Address" />
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem xs={4} md={4} lg={4}>
            <Field {...textField} name="city" label="City" />
          </FormItem>
          <FormItem xs={4} md={4} lg={4}>
            <Field {...textField} name="state" label="State" />
          </FormItem>
          <FormItem xs={4} md={4} lg={4}>
            <Field {...textField} name="zip" label="Zip Code" />
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
