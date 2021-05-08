import React from 'react';
import { TextField as MuiTextField } from '../../material';
// import { fieldToTextField, TextFieldProps } from 'formik-material-ui';
import { TextboxField, TextboxFieldProps } from './textbox-field';

const formatValue = (value: string) => {
  return value
    .replace(/\D/g, '')
    .split('')
    .reduce((acc, digit, index) => {
      if (index > 8) return `${acc}`;
      if (index === 5) return `${acc}-${digit}`;

      return `${acc}${digit}`;
    }, '');
};

// export const ZipCodeField = (props: TextFieldProps) => {
//   const {
//     form: { setFieldValue },
//     field: { name, value: prevValue }
//   } = props;
//   // console.log('prevValue', prevValue);
//   const onChange = React.useCallback(
//     event => {
//       const { value } = event.target;
//       // console.log('onChange value', value);
//       setFieldValue(name, value ? formatValue(value) : '');
//     },
//     [setFieldValue, name]
//   );
//   return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
// };
// export default ZipCodeField;
