import React from 'react';
import { useFormikContext, Field } from 'formik';
import { Login } from './login.interfaces';
import { Box, Button, Paper, Typography } from '@material-ui/core';
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
import { Customer } from '@airline/airline-interfaces';
export const RegisterFields = () => {
  const {
    submitForm,
    isSubmitting,
    errors,
    values,
  } = useFormikContext<Customer>();
  return (
    <Grid container alignContent="center" justify="center">
      <Grid item lg={6}>
        <Box paddingTop={25}>
          <Paper>
            <Box padding={2}>
              <Typography variant="h5">Register</Typography>
            </Box>
            <FormLayout>
              <FormRow>
                <FormItem xs={12} md={12} lg={12}>
                  <Box paddingLeft={5} paddingRight={5}>
                    <Field {...textField} name="email" label="Customer Email" />
                  </Box>
                </FormItem>
              </FormRow>
              <FormRow>
                <FormItem xs={6} md={6} lg={6}>
                  <Box paddingLeft={5}>
                    <Field {...textField} name="firstName" label="First Name" />
                  </Box>
                </FormItem>
                <FormItem xs={6} md={6} lg={6}>
                  <Box paddingRight={5}>
                    <Field
                      {...textField}
                      name="middleName"
                      label="Middle Name"
                    />
                  </Box>
                </FormItem>
              </FormRow>
              <FormRow>
                <FormItem xs={6} md={6} lg={6}>
                  <Box paddingLeft={5}>
                    <Field {...textField} name="lastName" label="Last Name" />
                  </Box>
                </FormItem>
                <FormItem xs={6} md={6} lg={6}>
                  <Box paddingRight={5}>
                    <Field
                      {...textField}
                      name="homeAirport"
                      label="Home Airport (Code)"
                    />
                  </Box>
                </FormItem>
              </FormRow>
              <FormRow>
                <FormItem>
                  <Box paddingLeft={2} paddingRight={2} paddingBottom={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      //onClick={submitForm}
                      startIcon={<NavigateNextIcon />}
                      type="submit"
                    >
                      Register
                    </Button>
                  </Box>
                </FormItem>
                <FormItem>
                  <Box paddingRight={2} paddingBottom={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={isSubmitting}
                      //onClick={submitForm}
                      startIcon={<CancelIcon />}
                      href="../"
                    >
                      Cancel
                    </Button>
                  </Box>
                </FormItem>
              </FormRow>
            </FormLayout>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};
