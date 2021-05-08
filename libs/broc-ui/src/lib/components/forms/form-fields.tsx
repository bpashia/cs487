import React from 'react';
import { Field } from 'formik';
import {
  fieldToTextField,
  fieldToCheckbox,
  Checkbox,
  CheckboxWithLabel,
  // RadioGroup,
  Select,
  SimpleFileUpload,
  TextField,
  TextFieldProps,
} from 'formik-material-ui';
// import { DatePicker, KeyboardDatePicker } from 'formik-material-ui-pickers';
// import { Autocomplete } from 'material-ui-formik-components/Autocomplete';
// import { ChipInput } from 'material-ui-formik-components/ChipInput';

// import { Select } from 'material-ui-formik-components/Select';
// import { Switch } from 'material-ui-formik-components/Switch';

// import { Select } from 'material-ui-formik-components/Select';
import { CurrencyField } from './currency-field';
// import { ZipCodeField } from './zip-code-field';
import { DatePickerField, DateTimePickerField } from './pickers';
import { RadioGroupField } from './radio-group-field';
// import { SelectField } from './select-field';
import { SwitchField } from './switch-field';

export const defaults: {
  variant: 'standard' | 'outlined' | 'filled';
  margin?: 'normal';
  fullWidth?: boolean;
} = {
  // InputLabelProps: {
  //   shrink: true,
  // },
  variant: 'outlined',
  margin: 'normal',
  fullWidth: true,
};
export const autocompleteDefaults = {
  ...defaults,
  // InputLabelProps: {
  //   shrink: true
  // }
  //component: Autocomplete
};

export const checkboxField = {
  ...defaults,
  type: 'checkbox',
  component: CheckboxWithLabel,
};



export const textField = {
  ...defaults,
  component: TextField,
};

// export const currencyField = {
//   ...defaults,
//   component: CurrencyField
// };



export const datePickerField = {
  ...defaults,
  inputVariant: defaults.variant,
  format: 'MM/dd/yy',
  component: DatePickerField,
};

export const dateTimePickerField = {
  ...defaults,
  inputVariant: defaults.variant,
  //format: 'MM/dd/yyyy',
  component: DateTimePickerField,
};

export const radioGroupField = {
  ...defaults,
  component: RadioGroupField,
};

export const selectDefaults = {
  ...defaults,
  // component: SelectField,
  select: true,
};

// export const switchField = {
//   ...defaults,
//   component: Switch,
// };
export const simpleFileUploadField = {
  ...defaults,
  component: SimpleFileUpload,
};

// export interface SelectProps {
//   name: string;
//   label: string;
//   options: Option[];
//   required?: boolean;
// }

// export const SelectField = ({
//   name,
//   label,
//   options,
//   required = false,
// }: SelectProps) => {
//   return <Select name="color" options={options} />;
// };
