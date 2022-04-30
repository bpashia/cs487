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
  Search as SearchIcon,
} from '@broc-ui';
import { textField } from '@broc-ui';
import { TextField } from 'formik-material-ui';
import { Search } from '@interfaces';
import { useRecoilState } from 'recoil';
export const SearchFields = () => {
  const {
    submitForm,
    isSubmitting,
    errors,
    values,
  } = useFormikContext<Search>();

  return (
    <>
      {/* <div>{JSON.stringify(values,null,2)}</div> */}
      <FormLayout>
        <FormRow>
          <FormItem xs={10} md={10} lg={10}>
            <Field {...textField} name="search" label="Search Posts" />
          </FormItem>
          <FormItem xs={2} md={2} lg={2}>
            <Box paddingTop={2}>
              <Button
                color="primary"
                variant={'contained'}
                disabled={isSubmitting}
                type="submit"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Box>
          </FormItem>
        </FormRow>
      </FormLayout>
    </>
  );
};
