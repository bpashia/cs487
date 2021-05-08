import React from 'react';
import { Redirect } from 'react-router-dom';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardHeader,
  Step,
  StepLabel,
  Stepper as MuiStepper,
  StepContent,
  Typography,
  makeStyles,
  createStyles,
  useTheme
} from '../material';
import {
  StepperProvider,
  useStepperApi,
  useStepperState
} from './stepper-context';

/* eslint-disable-next-line */
export interface CustomStepperProps {
  redirectTo?: string;
  getStepContent: (
    index: number,
    activeStep: number,
    handleNext?: Function
  ) => React.ReactElement;
  orientation?: 'vertical' | 'horizontal';
}

export interface BrsStepperProps extends CustomStepperProps {
  steps: React.ReactNode[];
}

const classNames = 'MuiPaper-elevation6';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      // width: '90%',
    },
    stepper: {
      marginLeft: '-32px'
    },
    button: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    clickable: {
      cursor: 'pointer'
    }
  })
);

const Stepper = ({
  getStepContent,
  redirectTo,
  orientation
}: CustomStepperProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { activeStep, steps } = useStepperState();
  const { handleNext, setActiveStep } = useStepperApi();

  const doRedirect = activeStep === steps.length && !!redirectTo;

  return (
    <div className={classes.root}>
      <MuiStepper
        activeStep={activeStep}
        className={classes.stepper}
        orientation={orientation}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const completed = activeStep > index;
          const labelProps = completed
            ? {
                onClick: () => {
                  setActiveStep(index);
                },
                className: classes.clickable
              }
            : {};
          const active = activeStep === index;
          return (
            <Step
              key={String(label)}
              {...stepProps}
              active={completed || active}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
              {orientation === 'vertical' ? (
                <StepContent>
                  <div>
                    {doRedirect ? (
                      <Redirect to={redirectTo} />
                    ) : (
                      <div>{getStepContent(index, activeStep, handleNext)}</div>
                    )}
                  </div>
                </StepContent>
              ) : null}
            </Step>
          );
        })}
      </MuiStepper>
      {orientation === 'horizontal' ? (
        <div>
          {doRedirect ? (
            <Redirect to={redirectTo} />
          ) : (
            <div>{getStepContent(activeStep, activeStep, handleNext)}</div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export const BrsStepper = ({
  steps,
  getStepContent,
  redirectTo,
  orientation = 'vertical'
}: BrsStepperProps) => {
  return (
    <StepperProvider steps={steps}>
      <Stepper
        getStepContent={getStepContent}
        redirectTo={redirectTo}
        orientation={orientation}
      />
    </StepperProvider>
  );
};

export default BrsStepper;
