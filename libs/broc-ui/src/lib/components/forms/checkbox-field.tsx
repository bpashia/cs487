import React from 'react';
import { Formik, Field, Form, useField, useFormikContext } from 'formik';
// import { checkboxField } from './form-fields';
import { CheckboxWithLabel, fieldToCheckbox } from 'formik-material-ui';
import {
  FormControl,
  FormControlLabel,
  makeStyles,
  createStyles,
  useTheme,
} from '../../material';

import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
// import CheckboxWithLabel, {CheckboxWithLabelProps } from '@material-ui/core/C';

export interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3, 0),
      // border: '1px solid green',
    },

    formControlLabel: {
      // display: 'inline-block',
      // border: '1px solid red',
    },
  })
);

export const CheckboxField = <T extends boolean = boolean>({
  name,
  label,
  onChange,
  indeterminate = false,
}: CheckboxFieldProps) => {
  const [field, meta] = useField<T>(name);
  const form = useFormikContext();
  const { ...props } = fieldToCheckbox({ field, meta, form });
  // console.log(JSON.stringify({ field, meta, props }, null, 2));

  const theme = useTheme();
  const classes = useStyles(theme);
  // const overrides = onChange ? { onChange } : {};
  // const Label = React.useMemo(() => ({ label }), [label]);
  // console.log('label', Label);
  return (
    <FormControl component="div" fullWidth className={classes.formControl}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            {...props}
            onChange={onChange || props.onChange}
            indeterminate={
              indeterminate === undefined ? props.indeterminate : indeterminate
            }
            checked={field.value}
          />
        }
        label={label}
        className={classes.formControlLabel}
      />
    </FormControl>
  );
};

export default CheckboxField;
