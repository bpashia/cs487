import React from 'react';
import { useFormikContext, useField } from 'formik';

import { TextField as MuiTextField } from '../../material';
import {
  fieldToTextField,
  TextFieldProps as FMuiTextFieldProps,
} from 'formik-material-ui';
import { defaults } from './form-fields';

export interface TextboxFieldProps<FormValuesType extends any = unknown>
  extends Partial<FMuiTextFieldProps> {
  name: keyof FormValuesType & string;
  label: string;
}

export const TextboxField = <FormValuesType extends any = unknown>({
  name,
  label,
  helperText,
  onChange,

  ...props
}: TextboxFieldProps<FormValuesType>) => {
  const [field, meta] = useField(name);
  const form = useFormikContext<FormValuesType>();
  const textFieldProps = fieldToTextField({
    field,
    meta,
    form,
  });
  // console.log('props', props);

  // console.log('textFieldProps', textFieldProps);
  return (
    <MuiTextField
      label={`${label}`}
      {...props}
      {...textFieldProps}
      helperText={helperText || textFieldProps.helperText}
      {...defaults}
      onChange={onChange || textFieldProps.onChange}
    />
  );
};

export default TextboxField;
