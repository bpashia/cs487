import React from 'react';
import { useFormikContext, Field } from 'formik';
import { Box, Button, Paper, Typography } from '@material-ui/core';
import {
  FormLayout,
  FormRow,
  FormItem,
  NavigateNextIcon,
  Grid,
  Card,
  CancelIcon,
  AutocompleteField,
  Option,
  AutocompleteMultipleField,
  useEditableCardApi,
  Save,
} from '@broc-ui';
import { textField } from '@broc-ui';
import { TextField } from 'formik-material-ui';
import { Tag, User } from '@interfaces';
export const AccountInfoFields = () => {
  const { submitForm, isSubmitting, errors, values } = useFormikContext<User>();
  const cardApi = useEditableCardApi();

  const universities = [{ id: 1, universityName: 'Illinois Tech' }];
  const universityOptions: Option<number>[] = universities.map((uni) => ({
    label: `${uni.universityName}`,
    value: uni.id,
  }));

  return (
    <>
      {/* <div>{JSON.stringify({ values, errors }, null, 2)}</div> */}
      <Grid container alignContent="center" justify="center">
        <Grid item lg={6}>
          {/* <Box padding={2}>
              <Typography variant="h5">Register</Typography>
            </Box> */}
          <FormLayout>
            <FormRow>
              <FormItem xs={6} md={6} lg={6}>
                <Box paddingLeft={5}>
                  <Field {...textField} name="firstName" label="First Name" />
                </Box>
              </FormItem>
              <FormItem xs={6} md={6} lg={6}>
                <Box paddingRight={5}>
                  <Field {...textField} name="middleName" label="Middle Name" />
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
                  <AutocompleteField
                    name="universityId"
                    label="University"
                    options={universityOptions}
                  />
                </Box>
              </FormItem>
            </FormRow>

            <FormRow>
              <FormItem xs={12} md={12} lg={12}>
                <Box paddingLeft={5} paddingRight={5}>
                  <Field {...textField} name="email" label="Email" />
                </Box>
              </FormItem>
            </FormRow>
            <FormRow>
              <FormItem xs={12} md={12} lg={12}>
                <Box paddingLeft={5} paddingRight={5}>
                  <Field {...textField} name="password" label="Password" />
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
                    startIcon={<Save />}
                    type="submit"
                  >
                    Save
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
                    onClick={() => {
                      cardApi.toggleEditMode();
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </FormItem>
            </FormRow>
          </FormLayout>
        </Grid>
      </Grid>
    </>
  );
};
