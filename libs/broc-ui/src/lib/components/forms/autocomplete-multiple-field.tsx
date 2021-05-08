import React from 'react';

import { useFormikContext, useField } from 'formik';

import Autocomplete, {
  AutocompleteProps,
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { TextField as MuiTextField } from '../../material';
import { InputProps } from '@material-ui/core';
import { fieldToTextField } from 'formik-material-ui';
import ErrorBoundary from '../error-boundary';
import { Option } from './options';
// import { autocompleteDefaults } from './form-fields';
import { Value } from '@material-ui/lab/useAutocomplete';

const _findOption = <
  V extends number | string = string,
  OptionType extends Option<V> = Option<V>
  // Multiple extends boolean = false,
  // DisableClearable extends boolean = false,
  // FreeSolo extends boolean = false
>() => (value: V[], options: OptionType[]): OptionType => {
  // console.log('findOption', { value, options });
  if (!(value && value.length)) return null;
  return options.find((o) => String(o.value) === String(value)) || null;
};

const _getOptionLabel = <
  V extends number | string = string,
  OptionType extends Option<V> = Option<V>
>() => (option: OptionType): string => option.label;

const _renderOption = <
  V extends number | string = string,
  OptionType extends Option<V> = Option<V>
>() => (option: OptionType): React.ReactNode => (
  <React.Fragment>{option.label}</React.Fragment>
);

export interface AutocompleteMultipleFieldProps<
  V extends number | string = string,
  OptionType extends Option<V> = Option<V>,
  Multiple extends boolean = true,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>
  extends Partial<
    AutocompleteProps<OptionType, true, DisableClearable, FreeSolo>
  > {
  name: string;
  options: OptionType[];
  label: string;
  required?: boolean;
  helperText?: string;
  onChange?: (
    ev,
    value: Value<OptionType, true, DisableClearable, true>
  ) => void;

  findOption?: (
    value: V[], //Value<OptionType, Multiple, DisableClearable, FreeSolo>,
    options: OptionType[]
  ) => OptionType;
  inputProps?: Partial<InputProps>;
  getValue?: (value: V[] | OptionType[]) => OptionType[];
}

export const AutocompleteMultipleField = <
  V extends number | string = string,
  FormValues = unknown,
  OptionType extends Option<V> = Option<V>,
  Multiple extends boolean = true,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>({
  required = false,
  name,
  options,
  label,
  filterOptions = createFilterOptions<OptionType>({
    stringify: (option: OptionType) => option.label,
    ignoreCase: true,
  }),
  findOption = _findOption<
    V,
    OptionType
    // Multiple,
    // DisableClearable,
    // FreeSolo
  >(),
  getOptionLabel = _getOptionLabel<V, OptionType>(),
  renderOption = _renderOption<V, OptionType>(),
  onChange,
  getOptionSelected,
  getValue,
  inputProps,
  helperText,
  ...props
}: AutocompleteMultipleFieldProps<
  V,
  OptionType,
  true,
  DisableClearable,
  FreeSolo
>) => {
  const [field, meta] = useField<V[]>(name);
  const form = useFormikContext<FormValues>();
  const { error, helperText: _helperText, autoComplete } = fieldToTextField({
    field,
    form,
    meta,
  });
  const { setTouched, setFieldValue, touched, isSubmitting } = form;

  const _getOptionSelected = getOptionSelected
    ? getOptionSelected
    : (option, value) => {
        // console.log('getOptionSelected', { value, option });
        if (!value) return false;
        if (value && value.value) return String(value.value) === option.value;
        return String(value) === option.value;
      };

  const _getValue = getValue
    ? getValue
    : (value: any[]): OptionType[] => {
        if (!(value && value.length)) return [];
        const values = value
          .map((v) => {
            const val = v ? (typeof v === 'string' ? v : v.value) : null;
            const mapped = options.find((o) => o.value === val);
            console.log({ mapped });
            return mapped;
          })
          .filter((option) => !!option);
        // const values = value.map((v) => options.find((o) => o.value === v));
        return values;
      };

  const handleChange = onChange
    ? onChange
    : (_, value: Value<OptionType, true, DisableClearable, false>) => {
        const mapped =
          (value && value.length && value.map((o) => o.value)) || [];
        // console.log('onChange', { value, mapped });
        setFieldValue(
          name,
          // value || []
          mapped
        );
      };

  return (
    <ErrorBoundary>
      <>
        {/* {JSON.stringify(field, null, 2)} */}
        <Autocomplete<OptionType, true, DisableClearable, FreeSolo>
          multiple
          id={`${name}_id`}
          options={options}
          onChange={handleChange}
          disabled={isSubmitting}
          {...props}
          value={_getValue(field.value)}
          getOptionSelected={_getOptionSelected}
          onBlur={() => setTouched({ ...touched, [field.name]: true })}
          selectOnFocus={true}
          filterOptions={filterOptions}
          autoSelect
          autoHighlight
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          renderInput={(params) => (
            <MuiTextField
              {...params}
              label={label}
              required={required}
              // {...autocompleteDefaults}
              helperText={_helperText || helperText}
              error={error}
              InputProps={{
                ...params.InputProps,
                ...(inputProps || {}),
              }}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </>
    </ErrorBoundary>
  );
};

export default AutocompleteMultipleField;
