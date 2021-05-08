// import React from 'react';

// // import MaskedInput from 'react-text-mask';
// import { TextboxField, TextboxFieldProps } from './textbox-field';

// interface TextMaskCustomProps {
//   inputRef: (ref: HTMLInputElement | null) => void;
// }

// function TextMaskCustom(props: TextMaskCustomProps) {
//   const { inputRef, ...other } = props;

//   return (
//     <MaskedInput
//       {...other}
//       ref={(ref: any) => {
//         inputRef(ref ? ref.inputElement : null);
//       }}
//       mask={[
//         '(',
//         /[1-9]/,
//         /\d/,
//         /\d/,
//         ')',
//         ' ',
//         /\d/,
//         /\d/,
//         /\d/,
//         '-',
//         /\d/,
//         /\d/,
//         /\d/,
//         /\d/
//       ]}
//       placeholderChar={'\u2000'}
//       showMask
//     />
//   );
// }

// export const PhoneNumberField = <FormValuesType extends any = unknown>(
//   props: TextboxFieldProps<FormValuesType>
// ) => {
//   return (
//     <TextboxField<FormValuesType>
//       {...props}
//       InputProps={{
//         inputComponent: TextMaskCustom as any
//       }}
//     />
//   );
// };

// export default PhoneNumberField;
