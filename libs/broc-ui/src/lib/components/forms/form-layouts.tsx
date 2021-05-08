import React, { ReactNode } from 'react';

import Grid from '@material-ui/core/Grid';
import { Typography, createStyles, makeStyles, useTheme } from '../../material';

type FormItemProps = {
  xs?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children: ReactNode;
};

export const FormItem = ({
  xs = 12,
  md = 6,
  lg = 4,
  children,
}: FormItemProps) => {
  return (
    <Grid item xs={xs} md={md} lg={lg}>
      {children}
    </Grid>
  );
};

export const FormRow = ({ children }) => (
  <Grid container item spacing={3}>
    {children}
  </Grid>
);

const useFormLayoutStyles = makeStyles((theme) =>
  createStyles({
    root: {
      //margin: theme.spacing(1, 3),
      // border: '1px solid green',
    },
  })
);

export const FormLayout = ({ children }) => {
  const theme = useTheme();
  const classes = useFormLayoutStyles(theme);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {children}
      </Grid>
    </div>
  );
};

const useHeaderStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1, 0),
      // border: '1px solid green',
    },
  })
);

export const FormHeader = ({ text }) => {
  const theme = useTheme();
  const classes = useHeaderStyles(theme);
  // console.log({ classes });
  return (
    <Grid item xs={12}>
      <Typography variant="h5" className={classes.root}>
        {text}
      </Typography>
    </Grid>
  );
};

const useSubheaderStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      // border: '1px solid red',
    },
  })
);

export const FormSubheader = ({ text }) => {
  const theme = useTheme();
  const classes = useSubheaderStyles(theme);
  return (
    <Grid item xs={12}>
      <Typography variant="h6" className={classes.root}>
        {text}
      </Typography>
    </Grid>
  );
};

const useFormGroupHeaderStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(-1.5),
      color: theme.palette.text.primary,
      // border: '1px solid red',
    },
  })
);

export const FormGroupHeader = ({ text }) => {
  const theme = useTheme();
  const classes = useFormGroupHeaderStyles(theme);
  return (
    <Grid item xs={12}>
      <Typography variant="subtitle1" className={classes.root}>
        {text}
      </Typography>
    </Grid>
  );
};

export default FormLayout;
