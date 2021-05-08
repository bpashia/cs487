import React from 'react';
import {
  Formik,
  Field,
  Form,
  useFormikContext,
  FormikContextType,
  useField,
  FieldInputProps,
  FieldMetaProps,
} from 'formik';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  createStyles,
  makeStyles,
  useTheme,
} from '../../material';

import { Option } from './options';
// import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
// import FormControlLabel, {
//   FormControlLabelProps,
// } from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3, 0),
      // border: '1px solid green',
    },
    radioGroup: {
      // display: 'flex',
      // border: '1px solid orange',
    },
    formControlLabel: {
      // display: 'inline-block',
      // border: '1px solid red',
    },
  })
);

export interface RadioGroupFieldProps<ValuesType = any> {
  label: string;
  name: keyof ValuesType & string;
  options: Option<string>[];
  required: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RadioGroupField<FormValues = any>({
  label,
  name,
  options,
  onChange,
  required,
}: RadioGroupFieldProps) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const form = useFormikContext<FormValues>();
  const [field] = useField(name);

  return (
    <div className={classes.root}>
      <FormControl
        component="div"
        className={classes.formControl}
        required={required}
        fullWidth
      >
        <FormLabel component="label">{label}</FormLabel>
        <RadioGroup
          aria-label={label}
          name={name}
          className={classes.radioGroup}
          {...field}
          row
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={String(option.value)}
              control={
                <Radio
                  onChange={onChange || field.onChange}
                  checked={option.value === field.value}
                />
              }
              label={option.label}
              className={classes.formControlLabel}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioGroupField;
