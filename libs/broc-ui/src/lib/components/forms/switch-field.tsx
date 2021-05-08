import React from 'react';
import { Formik, Field, Form, useField } from 'formik';

// import { SwitchWithLabel } from 'formik-material-ui';
import {
  FormControl,
  FormControlLabel,
  makeStyles,
  createStyles,
  useTheme
} from '../../material';

import Switch, { SwitchProps } from '@material-ui/core/Switch';

export interface SwitchFieldProps extends SwitchProps {
  name: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex'
    },
    formControl: {
      margin: theme.spacing(3, 0)
      // border: '1px solid green',
    },

    formControlLabel: {
      // display: 'inline-block',
      // border: '1px solid red',
    }
  })
);

export const SwitchField = ({
  name,
  label,
  onChange = undefined
}: SwitchFieldProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  // const overrides = onChange ? { onChange } : {};
  const [field, meta] = useField(name);
  const fieldProps = {
    ...field,
    onChange: onChange ? onChange : field.onChange
    //...overrides,
    // checked: field.checked === undefined ? field.value : field.checked
  };
  // console.log(name, { field, meta });
  console.log(name, {
    value: field.value,
    checked: field.checked,
    meta,
    fieldProps
  });

  return (
    <FormControl component="div" fullWidth className={classes.formControl}>
      <FormControlLabel
        control={<Switch name={name} {...fieldProps} value="true" />}
        label={label}
        className={classes.formControlLabel}
      />
    </FormControl>
  );
};

export default SwitchField;
