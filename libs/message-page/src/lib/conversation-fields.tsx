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
  AutocompleteMultipleField,
  Option,
} from '@broc-ui';
import { textField } from '@broc-ui';
import { TextField } from 'formik-material-ui';
import { NewConversation, Post, Tag, User } from '@interfaces';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  allTags,
  allUsers,
  selectedNewConversation,
  selectedPost,
} from '@cs487-app/state';

const messageFieldProps = { ...textField, ...{ multiline: true, rows: 3 } };

export const NewConversationFields = () => {
  const {
    submitForm,
    isSubmitting,
    errors,
    values,
    setFieldError,
    setErrors,
  } = useFormikContext<NewConversation>();
  const [
    currentSelectedNewConversation,
    setSelectedNewConversation,
  ] = useRecoilState<NewConversation>(selectedNewConversation);
  const allCurrentUsers = useRecoilValue<User[]>(allUsers);
  React.useEffect(() => {
    if (values.toEmail) {
      const toUser = allCurrentUsers.find(
        (user) => user.email === values.toEmail
      );
      if (!toUser) {
        setFieldError('toEmail', 'Invalid User Email');
      } else {
        setFieldError('toEmail', null);
      }
    }
  }, [allCurrentUsers, values, setFieldError]);

  return (
    <>
      {/* <div>{JSON.stringify(errors, null, 2)}</div> */}
      <FormLayout>
        <FormRow>
          <FormItem xs={12} md={12} lg={12}>
            <Field {...textField} name="toEmail" label="Send To" />
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem xs={12} md={12} lg={12}>
            <Field {...textField} name="subject" label="Subject" />
          </FormItem>
        </FormRow>

        <FormRow>
          <FormItem xs={12} md={12} lg={12}>
            <Field {...messageFieldProps} name="firstMessage" label="Message" />
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
              onClick={() => {
                setSelectedNewConversation(null);
              }}
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
