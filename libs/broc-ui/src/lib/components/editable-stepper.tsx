// import React from 'react';
// import { Redirect } from 'react-router-dom';

// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardActionArea,
//   CardHeader,
//   Step,
//   StepLabel,
//   Stepper as MuiStepper,
//   StepContent,
//   Typography,
//   makeStyles,
//   createStyles,
//   useTheme,
// } from '../material';
// import {
//   EditableStepperProvider,
//   useEditableStepperApi,
//   useEditableStepperState,
// } from './editable-stepper-context';
// import ErrorBoundary from './error-boundary';
// import { useFormikContext } from 'formik';
// import { BaseEntity } from '@brs/api-interfaces';

// /* eslint-disable-next-line */
// export interface CustomEditableStepperProps {
//   redirectTo?: string;
//   orientation?: 'vertical' | 'horizontal';
// }

// export interface BrsEditableStepperProps extends CustomEditableStepperProps {
//   steps: React.ReactNode[];
// }

// const classNames = 'MuiPaper-elevation6';

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       // width: '90%',
//     },
//     stepper: {
//       marginLeft: '-32px',
//     },
//     button: {
//       marginRight: theme.spacing(1),
//     },
//     instructions: {
//       marginTop: theme.spacing(1),
//       marginBottom: theme.spacing(1),
//     },
//     clickable: {
//       cursor: 'pointer',
//     },
//   })
// );

// const EditableStepper = ({
//   redirectTo,
//   orientation,
// }: CustomEditableStepperProps) => {
//   const theme = useTheme();
//   const classes = useStyles(theme);
//   const { activeStep, steps, getStepContent, id } = useEditableStepperState();
//   const { handleNext, setActiveStep } = useEditableStepperApi();
//   // console.log({ activeStep, steps, getStepContent });
//   const doRedirect = activeStep === steps.length && !!redirectTo;
//   // console.log({doRedirect, activeStep, length: steps.length})

//   const getKey = (title: string) => title.replace(/\s/g, '');
//   // const { values } = useFormikContext<BaseEntity>();
//   // const [routeId, setRouteId] = React.useState(id);
//   // activeStep === 0 && !!values.id
//   //   ? setRouteId(String(values.id))
//   //   : setRouteId(routeId);
//   return (
//     <div className={classes.root}>
//       <MuiStepper
//         activeStep={activeStep}
//         className={classes.stepper}
//         orientation={orientation}
//       >
//         {steps.map(({ title }, index) => {
//           // const stepProps: { completed?: boolean } = {};
//           const completed = activeStep > index;
//           const labelProps = completed
//             ? {
//                 onClick: () => {
//                   setActiveStep(index);
//                 },
//                 className: classes.clickable,
//               }
//             : {};
//           const active = activeStep === index;
//           return (
//             <Step
//               key={getKey(title)}
//               // {...stepProps}
//               active={completed || active}
//             >
//               <StepLabel {...labelProps}>{title}</StepLabel>
//               {orientation === 'vertical' ? (
//                 <StepContent>
//                   <div>
//                     {doRedirect ? (
//                       <Redirect to={redirectTo} />
//                     ) : (
//                       <div>{getStepContent(index)}</div>
//                     )}
//                   </div>
//                 </StepContent>
//               ) : null}
//             </Step>
//           );
//         })}
//       </MuiStepper>
//       {orientation === 'horizontal' ? (
//         <div>
//           {doRedirect ? (
//             <Redirect to={redirectTo} />
//           ) : (
//             <div>{getStepContent(activeStep)}</div>
//           )}
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export const BrsEditableStepper = ({
//   steps,
//   redirectTo,
//   orientation = 'vertical',
// }: BrsEditableStepperProps) => {
//   return (
//     <EditableStepperProvider steps={steps}>
//       <ErrorBoundary>
//         <EditableStepper redirectTo={redirectTo} orientation={orientation} />
//       </ErrorBoundary>
//     </EditableStepperProvider>
//   );
// };

// export default BrsEditableStepper;
