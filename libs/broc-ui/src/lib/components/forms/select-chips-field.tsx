import React from 'react';
import { useField, useFormikContext } from 'formik';

import {
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  createStyles,
  useTheme,
  makeStyles
} from '../../material';

const useStyles = makeStyles(theme =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
      // maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    }
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(value: string, selectedValues: string[], theme) {
  return {
    fontWeight:
      selectedValues.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export interface SelectChipsFieldProps<FormValuesType extends object> {
  name: keyof FormValuesType & string;
  label: string;
  options: string[];
}

export function SelectChipsField<FormValuesType extends object>({
  name,
  label,
  options
}: SelectChipsFieldProps<FormValuesType>) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { setFieldValue } = useFormikContext<FormValuesType>();
  const [, meta] = useField<string[]>(name);

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>(
    meta.initialValue || []
  );

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOptions(event.target.value as string[]);
  };

  React.useEffect(() => {
    setFieldValue(name, selectedOptions, true);
  }, [selectedOptions, setFieldValue, name]);

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
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={`${labelId}`}
        id={selectId}
        multiple
        value={selectedOptions}
        onChange={handleChange}
        input={<Input id={`${inputId}`} />}
        renderValue={selected => (
          <div className={classes.chips}>
            {(selected as string[]).map(value => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            value={option}
            style={getStyles(option, selectedOptions, theme)}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default SelectChipsField;
