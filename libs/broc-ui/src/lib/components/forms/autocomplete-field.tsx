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
>() => (value: V, options: OptionType[]): OptionType => {
  if (!value) return null;
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

export interface AutocompleteFieldProps<
  V extends number | string = string,
  OptionType extends Option<V> = Option<V>,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>
  extends Partial<
    AutocompleteProps<OptionType, Multiple, DisableClearable, FreeSolo>
  > {
  name: string;
  options: OptionType[];
  label: string;
  required?: boolean;
  helperText?: string;
  onChange?: (
    ev,
    option: Value<OptionType, Multiple, DisableClearable, FreeSolo>
  ) => void;

  findOption?: (
    value: V, //Value<OptionType, Multiple, DisableClearable, FreeSolo>,
    options: OptionType[]
  ) => OptionType;
  inputProps?: Partial<InputProps>;
}

export const AutocompleteField = <
  V extends number | string,
  FormValues = unknown,
  OptionType extends Option<V> = Option<V>,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
>({
  required = false,
  name,
  options,
  label,
  helperText,
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
  inputProps,
  ...props
}: AutocompleteFieldProps<
  V,
  OptionType,
  Multiple,
  DisableClearable,
  FreeSolo
>) => {
  const [field, meta] = useField<V>(name);
  const form = useFormikContext<FormValues>();
  const { error, helperText: _helperText, autoComplete } = fieldToTextField({
    field,
    form,
    meta,
  });
  const { setTouched, setFieldValue, touched, isSubmitting } = form;

  const getOptionSelected = React.useCallback((value, option) => {
    // console.log('getOptionSelected', value, option);
    if (!value) return false;
    if (value && value.value) return String(value.value) === option.value;
    return String(value) === option.value;
  }, []);

  const getValue = React.useCallback(
    (value: V) =>
      (value ? findOption(value, options) || null : null) as Value<
        OptionType,
        Multiple,
        DisableClearable,
        FreeSolo
      >,
    [options, findOption]
  );

  const handleChange = onChange
    ? onChange
    : (_, option: Value<OptionType, Multiple, DisableClearable, FreeSolo>) => {
        // console.log('onChange', option);
        setFieldValue(name, (option && option['value']) || null);
      };

  return (
    <ErrorBoundary>
      <>
        {/* {JSON.stringify(field, null, 2)} */}
        <Autocomplete<OptionType, Multiple, DisableClearable, FreeSolo>
          id={`${name}_id`}
          options={options}
          onChange={handleChange}
          disabled={isSubmitting}
          {...props}
          value={getValue(field.value)}
          getOptionSelected={getOptionSelected}
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
              variant='outlined'
              helperText={helperText || _helperText}
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

export default AutocompleteField;
