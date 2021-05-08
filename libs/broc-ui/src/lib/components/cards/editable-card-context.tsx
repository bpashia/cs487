import React from 'react';
import { Editable, EditableProps, EditMode, useEditMode } from './use-editable';

// export interface EditableStepState extends EditableProps {
//   activeStep: number;
//   steps: EditableProps[];
//   getStepContent: (index: number) => React.ReactElement;
// }

export interface EditableCardState {
  inEditMode: boolean;
}

export interface EditableCardApi {
  setInEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleEditMode: () => void;
}

export const EditableCardStateContext = React.createContext<EditableCardState>(
  undefined
);

export const EditableCardApiContext = React.createContext<EditableCardApi>(
  undefined
);

const useCreateEditableCard = (
  editMode: EditMode
): [EditableCardState, EditableCardApi] => {
  const { inEditMode, setInEditMode, toggleEditMode } = editMode;

  // const [id, setId] = React.useState<string>('');
  // const [_steps, setSteps] = React.useState<EditableProps[]>(initialSteps);
  // const steps = React.useMemo(() => {
  //   console.log({ _steps: _steps });
  //   return _steps;
  // }, [_steps]);

  //const setActiveStep= React.useCallback((n: number) => setActive(n), []);
  // const handleNext = React.useCallback(() => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // }, [setActiveStep]);

  // const handleBack = React.useCallback(() => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // }, [setActiveStep]);

  // const handleReset = React.useCallback(() => {
  //   setActiveStep(0);
  // }, [setActiveStep]);

  const api = React.useRef({
    // setActiveStep: React.useCallback((n: number) => setActiveStep(n), []),
    // handleBack,
    // handleNext,
    // handleReset,
    setInEditMode,
    toggleEditMode,
  });

  // const getStep = (index: number) => steps[index] || null;
  // const getEditor = ({ content: { editor: Editor } }: EditableProps) => (
  //   <Editor handleNext={handleNext} />
  // );
  // const getSummary = ({ content: { summary: Summary } }: EditableProps) => (
  //   <Summary />
  // );

  //   const getStepContent = React.useCallback(
  //     (index: number) => {
  //       // console.log('get Step Content', { step, Card, location });
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

  return [{ inEditMode }, api.current];
};

// export const EditableCardContextProvider = ({ children,steps }) => {
//   const [state, api] = useEditableCardState(steps);
//   return <EditableCardContext.Provider value={state}>{children}</EditableCardContext.Provider>;
// };

// export const useEditableCard = () => {
//   return React.useContext(EditableCardContext);
// };

export function useEditableCardState(): EditableCardState {
  const context = React.useContext(EditableCardStateContext);
  // if (context === undefined) {
  //   throw new Error(
  //     'useEditableCardState must be used within a EditableCardProvider'
  //   );
  // }
  return context;
}

export function useEditableCardApi(): EditableCardApi {
  const context = React.useContext(EditableCardApiContext);
  // if (context === undefined) {
  //   throw new Error(
  //     'useEditableCardDispatch must be used within a EditableCardProvider'
  //   );
  // }
  return context;
}

export const EditableCardProvider = ({ editMode, children }) => {
  const [state, api] = useCreateEditableCard(editMode);

  return (
    <EditableCardStateContext.Provider value={state}>
      <EditableCardApiContext.Provider value={api}>
        {children}
      </EditableCardApiContext.Provider>
    </EditableCardStateContext.Provider>
  );
};

export default EditableCardProvider;
