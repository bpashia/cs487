// import React from 'react';

// import {
//   InputAdornment,
//   createStyles,
//   makeStyles,
//   useTheme,
// } from '../../material';

// import NumberFormat from 'react-number-format';

// import { TextboxField, TextboxFieldProps } from './textbox-field';

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
//   })
// );

// export const toPercentString = (value: number) =>
//   value.toLocaleString('en-US', { style: 'percent' });

// interface NumberFormatCustomProps {
//   inputRef: (instance: NumberFormat | null) => void;
//   onChange: (event: { target: { name: string; value: string } }) => void;
//   name: string;
// }

// function NumberFormatCustom(props: NumberFormatCustomProps) {
//   const { inputRef, onChange, ...other } = props;

//   return (
//     <NumberFormat
//       {...other}
//       getInputRef={inputRef}
//       onValueChange={(values) => {
//         onChange({
//           target: {
//             name: props.name,
//             value: values.value,
//           },
//         });
//       }}
//       thousandSeparator
//       isNumericString
//       decimalScale={2}
//       fixedDecimalScale
//       // prefix="$"
//     />
//   );
// }

// export const PercentField = <FormValuesType extends any = unknown>(
//   props: TextboxFieldProps<FormValuesType>
// ) => {
//   return (
//     <TextboxField<FormValuesType>
//       {...props}
//       InputProps={{
//         inputComponent: NumberFormatCustom as any,
//         endAdornment: <InputAdornment position="end">%</InputAdornment>,
//       }}
//     />
//   );
// };

// export default PercentField;
