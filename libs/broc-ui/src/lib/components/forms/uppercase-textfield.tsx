import React from 'react';
import { TextField as MuiTextField } from '../../material';
// import { fieldToTextField, TextFieldProps } from 'formik-material-ui';
import { TextboxField, TextboxFieldProps } from './textbox-field';
import { useFormikContext } from 'formik';

const formatValue = (value: string) => {
  return value.toLocaleUpperCase();
};

// export const UppercaseTextField = <FormValuesType extends any = any>({
//   name,
//   ...props
// }: TextboxFieldProps<FormValuesType>) => {
//   const { setFieldValue } = useFormikContext<FormValuesType>();
//   //  const {
//   //    form: { setFieldValue },
//   //    field: { name, value: prevValue }
//   //  } = props;
//   // console.log('prevValue', prevValue);
//   const onChange = React.useCallback(
//     event => {
//       const { value } = event.target;
//       console.log('onChange value', value);
//       setFieldValue(name, value ? formatValue(value) : '');
//     },
//     [setFieldValue, name]
//   );
//   return (
//     <TextboxField<FormValuesType> name={name} {...props} onChange={onChange} />
//   );
// };
// export default UppercaseTextField;
