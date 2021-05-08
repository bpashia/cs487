import React from 'react';

import {
  InputAdornment,
  createStyles,
  makeStyles,
  useTheme,
} from '../../material';

import NumberFormat from 'react-number-format';

import { TextboxField, TextboxFieldProps } from './textbox-field';

export const toCurrencyString = (value: number) =>
  value
    ? value.toLocaleString('en-US', { currency: 'USD', style: 'currency' })
    : value === 0
    ? '$0'
    : '';

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      decimalScale={2}
      //fixedDecimalScale
      //prefix="$"
    />
  );
}

export const CurrencyField = <FormValuesType extends any = unknown>(
  props: TextboxFieldProps<FormValuesType>
) => {
  return (
    <TextboxField<FormValuesType>
      {...props}
      InputProps={{
        inputComponent: NumberFormatCustom as any,
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  );
};

export default CurrencyField;
