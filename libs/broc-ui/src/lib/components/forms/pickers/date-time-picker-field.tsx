import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Formik,
  Form,
  Field,
  FieldInputProps,
  useFormikContext,
  useField,
  FieldMetaProps,
  FormikContextType
} from 'formik';
import { FieldProps, getIn } from 'formik';

import {
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps
} from '@material-ui/pickers';

export interface DateTimePickerFieldProps
  extends FieldProps,
    KeyboardDateTimePickerProps {}
// Omit<KeyboardDateTimePickerProps, 'name' | 'value' | 'error' | 'onChange'> {}

export const fieldToKeyboardDateTimePicker = ({
  disabled,
  field,
  form: { isSubmitting, touched, errors, setFieldValue, setFieldError },
  ...props
}: DateTimePickerFieldProps): KeyboardDateTimePickerProps => {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    ...props,
    ...field,
    error: showError,
    helperText: showError ? fieldError : props.helperText,
    disabled: disabled != undefined ? disabled : isSubmitting,
    onChange(date) {
      setFieldValue(field.name, date);
    },
    onError(error) {
      if (error !== fieldError && !(error == '' && !fieldError)) {
        
        setFieldError(field.name, error ? String(error) : undefined);
      }
    }
  };
};

export const DateTimePickerField = ({
  children,
  ...props
}: DateTimePickerFieldProps) => {
  // const currentError = form.errors[field.name] || undefined;
  // console.log(field.name, field.value, field);
  return (
    <KeyboardDateTimePicker {...fieldToKeyboardDateTimePicker(props)}>
      {children}
    </KeyboardDateTimePicker>
  );
};

export default DateTimePickerField;
