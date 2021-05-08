// import React, { ReactNode, ReactNodeArray } from 'react';
// import { Formik, Field, Form, useFormikContext } from 'formik';
// import {
//   Button,
//   LinearProgress,
//   Save,
//   NavigateNextIcon,
//   ChevronLeft,
//   CancelIcon,
//   Link as MuiLink,
//   Typography,
//   Box,
//   Grid,
// } from '../material';
// import {
//   useEditableStepperState,
//   useEditableStepperApi,
// } from './editable-stepper-context';
// import { Link } from 'react-router-dom';
// import { BaseEntity } from '@brs/api-interfaces';
// import { useEditable, useEditMode, Editable } from '../hooks';
// import {
//   useEditableCardState,
//   useEditableCardApi,
// } from './cards/editable-card-context';

// interface FormButtonsProps {
//   submitText?: string;
//   submitIcon?: ReactNode;
//   toCancel?: string;
//   hideCancel?: boolean;
//   additionalFormButtons?: ReactNodeArray;
// }
// export const FormButtons = ({
//   submitText,
//   submitIcon,
//   toCancel,
//   hideCancel,
//   additionalFormButtons,
// }: FormButtonsProps) => {
//   const { isSubmitting, submitForm, isValid, values } = useFormikContext<
//     BaseEntity
//   >();

//   const stepper = useEditableStepperState();
//   const stepperApi = useEditableStepperApi();
//   const card = useEditableCardState();
//   const cardApi = useEditableCardApi();
//   const setId = stepperApi ? stepperApi.setId : undefined;
//   const toggleEditMode = cardApi ? cardApi.toggleEditMode : undefined;
//   const activeStep = stepper ? stepper.activeStep : undefined;
//   const id = stepper ? stepper.id : undefined;

//   if (values.id !== undefined && !!stepper) {
//     setId(String(values.id));
//     console.log('Stepper ID: ', stepper.id);
//   }

//   const cancelUrl = !!stepper && activeStep !== 0 ? `./${stepper.id}` : '.';

//   const _submitText = submitText || (stepper ? 'Next' : 'Save');
//   const _submitIcon =
//     submitIcon || (_submitText === 'Next' ? <NavigateNextIcon /> : <Save />);

//   const cancelPath = toCancel || cancelUrl;

//   return (
//     <div className="newLine spanFour">
//       {isSubmitting && <LinearProgress />}
//       <br />
//       <Grid container spacing={1}>
//         <Grid item>
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={isSubmitting}
//             //onClick={submitForm}
//             startIcon={_submitIcon}
//             type="submit"
//           >
//             {`${_submitText}`}
//           </Button>
//         </Grid>
//         {additionalFormButtons &&
//           additionalFormButtons.length &&
//           additionalFormButtons.map((button, index) => (
//             <React.Fragment key={String(index)}>
//               <Grid item>{button}</Grid>
//             </React.Fragment>
//           ))}

//         {cancelPath && !hideCancel && !!card === false && (
//           <Link to={cancelPath}>
//             {/* {console.log('id', idRoute)} */}
//             <Button
//               //variant="contained"
//               color="primary"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//           </Link>
//         )}

//         {!!card && !hideCancel &&(
//           <MuiLink underline="always">
//             <Button
//               //variant="contained"
//               color="primary"
//               disabled={isSubmitting}
//               onClick={toggleEditMode}
//             >
//               <Typography>Cancel</Typography>
//             </Button>
//           </MuiLink>
//         )}
//       </Grid>
//     </div>
//   );
// };
// export default FormButtons;
