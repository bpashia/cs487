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
  KeyboardDatePicker,
  KeyboardDateTimePicker,
  KeyboardDatePickerProps,
  KeyboardDateTimePickerProps,
  KeyboardTimePickerProps
} from '@material-ui/pickers';

export interface DatePickerFieldProps
  extends FieldProps,
    KeyboardDatePickerProps {}
// Omit<KeyboardDatePickerProps, 'name' | 'value' | 'error' | 'onChange'> {}

export const fieldToKeyboardDatePicker = ({
  disabled,
  field,
  form: { isSubmitting, touched, errors, setFieldValue, setFieldError },
  ...props
}: DatePickerFieldProps): KeyboardDatePickerProps => {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore - https://github.com/jaredpalmer/formik/pull/2286
        setFieldError(field.name, error ? String(error) : undefined);
      }
    }
  };
};

export const DatePickerField = ({
  children,
  ...props
}: DatePickerFieldProps) => {
  // const currentError = form.errors[field.name] || undefined;
  // console.log(field.name, field.value, field);
  return (
    <KeyboardDatePicker {...fieldToKeyboardDatePicker(props)}>
      {children}
    </KeyboardDatePicker>
  );
};

export default DatePickerField;
