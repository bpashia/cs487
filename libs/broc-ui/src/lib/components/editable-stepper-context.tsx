// import React from 'react';
// import { Editable, EditableProps } from '../hooks';

// // export interface EditableStepState extends EditableProps {
// //   activeStep: number;
// //   steps: EditableProps[];
// //   getStepContent: (index: number) => React.ReactElement;
// // }

// export interface EditableStepperState {
//   activeStep: number;
//   steps: EditableProps[];
//   getStepContent: (index: number) => React.ReactElement;
//   id: string;
// }

// export interface EditableStepperApi {
//   setActiveStep: (activeStep: number) => void;
//   handleReset: () => void;
//   handleNext: () => void;
//   handleBack: () => void;
//   setId: (id: string) => void;
// }

// export const EditableStepperStateContext = React.createContext<
//   EditableStepperState
// >(undefined);

// export const EditableStepperApiContext = React.createContext<
//   EditableStepperApi
// >(undefined);

// const useCreateEditableStepper = (
//   initialSteps: EditableProps[]
// ): [EditableStepperState, EditableStepperApi] => {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [id, setId] = React.useState<string>('');
//   const [_steps, setSteps] = React.useState<EditableProps[]>(initialSteps);
//   const steps = React.useMemo(() => {
//     console.log({ _steps: _steps });
//     return _steps;
//   }, [_steps]);

//   //const setActiveStep= React.useCallback((n: number) => setActive(n), []);
//   const handleNext = React.useCallback(() => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   }, [setActiveStep]);

//   const handleBack = React.useCallback(() => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   }, [setActiveStep]);

//   const handleReset = React.useCallback(() => {
//     setActiveStep(0);
//   }, [setActiveStep]);

//   const api = React.useRef({
//     setActiveStep: React.useCallback((n: number) => setActiveStep(n), []),
//     handleBack,
//     handleNext,
//     handleReset,
//     setId: React.useCallback((i: string) => setId(i), []),
//   });

//   const getStep = (index: number) => steps[index] || null;
//   const getEditor = ({ content: { editor: Editor } }: EditableProps) => (
//     <Editor handleNext={handleNext} />
//   );
//   const getSummary = ({ content: { summary: Summary } }: EditableProps) => (
//     <Summary />
//   );

//   const getStepContent = React.useCallback(
//     (index: number) => {
//       // console.log('get Step Content', { step, stepper, location });
//       const step = getStep(index);
//       console.log('get Step Content', { step, index, activeStep });
//       if (!step) return null;
//       const active = index === activeStep;
//       const last = index === steps.length - 1;
//       const completed = activeStep > index;
//       if (active || last) return getEditor(step);
//       return completed ? getSummary(step) : getEditor(step);
//     },
//     [steps, activeStep]
//   );

//   return [{ activeStep, steps, getStepContent, id }, api.current];
// };

// // export const EditableStepperContextProvider = ({ children,steps }) => {
// //   const [state, api] = useEditableStepperState(steps);
// //   return <EditableStepperContext.Provider value={state}>{children}</EditableStepperContext.Provider>;
// // };

// // export const useEditableStepper = () => {
// //   return React.useContext(EditableStepperContext);
// // };

// export function useEditableStepperState(): EditableStepperState {
//   const context = React.useContext(EditableStepperStateContext);
//   // if (context === undefined) {
//   //   throw new Error(
//   //     'useEditableStepperState must be used within a EditableStepperProvider'
//   //   );
//   // }
//   return context;
// }

// export function useEditableStepperApi(): EditableStepperApi {
//   const context = React.useContext(EditableStepperApiContext);
//   // if (context === undefined) {
//   //   throw new Error(
//   //     'useEditableStepperDispatch must be used within a EditableStepperProvider'
//   //   );
//   // }
//   return context;
// }

// export const EditableStepperProvider = ({ steps, children }) => {
//   const [state, api] = useCreateEditableStepper(steps);

//   return (
//     <EditableStepperStateContext.Provider value={state}>
//       <EditableStepperApiContext.Provider value={api}>
//         {children}
//       </EditableStepperApiContext.Provider>
//     </EditableStepperStateContext.Provider>
//   );
// };

// export default EditableStepperProvider;
