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
import { Post, Tag } from '@interfaces';
import { useRecoilState, useRecoilValue } from 'recoil';
import { allTags, selectedPost } from '@cs487-app/state';

const contentFieldProps = { ...textField, ...{ multiline: true, rows: 8 } };

export const PostFields = () => {
  const { submitForm, isSubmitting, errors, values } = useFormikContext<Post>();
  const [currentSelectedPost, setSelectedPost] = useRecoilState<Post>(
    selectedPost
  );
  const tags = useRecoilValue<Tag[]>(allTags);

  const tagOptions: Option<string>[] = tags.map((tag) => ({
    label: `${tag.tagKeyword}`,
    value: tag.tagKeyword,
  }));
  return (
    <>
      {/* <div>{JSON.stringify(errors, null, 2)}</div> */}
      <FormLayout>
        <FormRow>
          <FormItem xs={12} md={6} lg={6}>
            <Field {...textField} name="title" label="Post Title" />
          </FormItem>
          <FormItem xs={12} md={6} lg={6}>
            <Field
              {...textField}
              name="content.pictureAddress"
              label="Image Link"
            />
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem xs={12} md={12} lg={12}>
            <AutocompleteMultipleField
              name="tags"
              label="Interest Tags"
              options={tagOptions}
            />
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem xs={12} md={12} lg={12}>
            <Field
              {...contentFieldProps}
              name="content.body"
              label="Post Body"
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
              onClick={() => {
                setSelectedPost(null);
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
