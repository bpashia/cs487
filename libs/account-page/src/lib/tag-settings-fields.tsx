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
  Save,
  useEditableCardApi,
} from '@broc-ui';
import { textField } from '@broc-ui';
import { TextField } from 'formik-material-ui';
import { Tag } from '@interfaces';
import { useRecoilValue } from 'recoil';
import { allTags } from '@cs487-app/state';
import { TagSettings } from './user.schema';
export const TagSettingFields = () => {
  const {
    submitForm,
    isSubmitting,
    errors,
    values,
  } = useFormikContext<TagSettings>();
  const cardApi = useEditableCardApi();

  const tags = useRecoilValue(allTags);
  const tagOptions: Option<string>[] = tags.map((tag) => ({
    label: `${tag.tagKeyword}`,
    value: tag.tagKeyword,
  }));

  return (
    <>
      {/* <div>{JSON.stringify({ values, errors }, null, 2)}</div> */}
      <Grid container alignContent="center" justify="center">
        <Grid item lg={6}>
          <FormLayout>
            <FormRow>
              <FormItem xs={12} md={12} lg={12}>
                <Box paddingLeft={5} paddingRight={5}>
                  <AutocompleteMultipleField
                    name="tags"
                    label="Interest Tags"
                    options={tagOptions}
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
