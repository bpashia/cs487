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
} from '@broc-ui';
import { textField } from '@broc-ui';
import { TextField } from 'formik-material-ui';
import Assignment from '@material-ui/icons/Assignment';
export const LoginFields = () => {
  const {
    submitForm,
    isSubmitting,
    errors,
    values,
  } = useFormikContext<Login>();
  return (
    <Grid container alignContent="center" justify="center">
      <Grid item lg={6}>
        <Box paddingTop={25}>
          <Paper>
            <Box padding={2}>
              <Typography variant="h5">Login</Typography>
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
                      Log In
                    </Button>
                  </Box>
                </FormItem>
                <FormItem>
                  <Box paddingLeft={2} paddingRight={2} paddingBottom={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={isSubmitting}
                      href="./register"
                      startIcon={<Assignment />}
                    >
                      Register
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
