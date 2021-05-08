import React, { ReactNode } from 'react';
import yup from 'yup';
import clsx from 'clsx';

import { createStyles, makeStyles, useTheme, Box } from '../../material';

import './summary.styles.scss';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'inline-flex',
      flexWrap: 'wrap',
    },
    column: {
      margin: '0 2rem 1rem 0',
    },
    header: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '0.88rem',
      // lineHeight: '150%',
    },
    data: {
      // fontSize: theme.typography.pxToRem(14),
      fontSize: theme.typography.pxToRem(16),
      color: 'rgba(0, 0, 0, 1)',
      //lineHeight: '18px',
      lineHeight: '1.75',
    },
    title: {
      // fontSize: theme.typography.pxToRem(18),
      color: theme.palette.primary.dark,
    },
    subtitle: {
      // fontSize: theme.typography.pxToRem(16),
      color: theme.palette.primary.dark,
    },
  })
);

interface SummaryProps {
  fields: SummaryField[];
}
export interface SummaryField {
  label: string;
  value: ReactNode;
  classNames?: 'title' | 'subtitle';
}

export const Summary = ({ fields }: SummaryProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const getClassName = (className?: string) =>
    className ? classes[className] : null;
  return (
    <div className={`${classes.root}`}>
      {fields.map(({ label, value, classNames }) => (
        <div className={`${classes.column}`} key={label}>
          <div className={`${classes.header}`}>{label}</div>
          <div className={`${classes.data} ${getClassName(classNames)}`}>
            {value}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Summary;
