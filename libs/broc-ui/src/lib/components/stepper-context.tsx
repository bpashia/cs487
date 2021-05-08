import React from 'react';

export interface StepperState {
  activeStep: number;
  steps: React.ReactNode[];
}

export interface StepperApi {
  setActiveStep: (activeStep: number) => void;
  handleReset: () => void;
  handleNext: () => void;
  handleBack: () => void;
}

export const StepperStateContext = React.createContext<StepperState>(undefined);
export const StepperApiContext = React.createContext<StepperApi>(undefined);

const useCreateStepper = (
  initialSteps: React.ReactNode[]
): [StepperState, StepperApi] => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = React.useState(initialSteps);

  //const setActiveStep= React.useCallback((n: number) => setActive(n), []);
  const handleNext = React.useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }, [setActiveStep]);

  const handleBack = React.useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }, [setActiveStep]);

  const handleReset = React.useCallback(() => {
    setActiveStep(0);
  }, [setActiveStep]);

  const api = React.useRef({
    setActiveStep: React.useCallback((n: number) => setActiveStep(n), []),
    handleBack,
    handleNext,
    handleReset
  });
  return [{ activeStep, steps }, api.current];
};

// export const StepperContextProvider = ({ children,steps }) => {
//   const [state, api] = useStepperState(steps);
//   return <StepperContext.Provider value={state}>{children}</StepperContext.Provider>;
// };

// export const useStepper = () => {
//   return React.useContext(StepperContext);
// };

export function useStepperState(): StepperState {
  const context = React.useContext(StepperStateContext);
  // if (context === undefined) {
  //   throw new Error(
  //     'useStepperState must be used within a StepperProvider'
  //   );
  // }
  return context;
}

export function useStepperApi(): StepperApi {
  const context = React.useContext(StepperApiContext);
  // if (context === undefined) {
  //   throw new Error(
  //     'useStepperDispatch must be used within a StepperProvider'
  //   );
  // }
  return context;
}

export const StepperProvider = ({ steps, children }) => {
  const [state, api] = useCreateStepper(steps);

  return (
    <StepperStateContext.Provider value={state}>
      <StepperApiContext.Provider value={api}>
        {children}
      </StepperApiContext.Provider>
    </StepperStateContext.Provider>
  );
};

export default StepperProvider;
