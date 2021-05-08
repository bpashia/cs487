import React from 'react';
import { useField, useFormikContext } from 'formik';

import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormHelperText,
  FormLabel,
  FormGroup,
  createStyles,
  useTheme,
  makeStyles,
} from '../../material';

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      // maxWidth: 300,
    },
  })
);

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250
//     }
//   }
// };

// function getStyles(value: string, selectedValues: string[], theme) {
//   return {
//     fontWeight:
//       selectedValues.indexOf(value) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium
//   };
// }

export interface ChecklistFieldProps<FormValuesType extends unknown> {
  name: keyof FormValuesType & string;
  label: string;
  options: string[];
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ChecklistField<FormValuesType extends unknown>({
  name,
  label,
  options,
  onChange,
  helperText,
}: ChecklistFieldProps<FormValuesType>) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { setFieldValue, setFieldTouched } = useFormikContext<FormValuesType>();
  const [field, meta] = useField<string[]>(name);
  // console.log('checklist', { field, meta });

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(
    meta.initialValue || []
  );

  const handleChange = (
    event: React.ChangeEvent<{ value: string; checked: boolean }>
  ) => {
    // console.log({ event });
    const { checked, value } = event.target;
    // console.log({ checked, value, selectedOptions });
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value]
    );
    //setSelectedOptions(event.target.value as string[]);
  };

  React.useEffect(() => {
    setFieldValue(name, selectedOptions, true);
    setFieldTouched(name, true, false);
  }, [selectedOptions, setFieldValue, setFieldTouched, name]);

  const selectId = `${name}-select-id`;
  const inputId = `${name}-id`;
  const labelId = `${selectId}-label`;
  const error = meta.error && meta.touched ? meta.error : null;
  return (
    <FormControl
      className={classes.formControl}
      fullWidth
      variant="standard"
      margin="normal"
      error={!!error}
      required
      component="fieldset"
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {options.map((option, index) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                name={`${field.name}[${index}]`}
                onChange={handleChange || field.onChange}
                checked={field.value.includes(option)}
                value={option}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
      <FormHelperText>{error || helperText}</FormHelperText>
    </FormControl>
  );
}
export default ChecklistField;
