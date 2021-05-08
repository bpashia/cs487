import React, { ReactNode } from 'react';

import clsx from 'clsx';

import {
  CardContent,
  createStyles,
  makeStyles,
  useTheme,
} from '../../material';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      // padding: theme.spacing(2),
      marginLeft: '40px',
      marginRight: '24px',
      marginTop: '-16px',
      // border: '1px solid blue',
    },
  })
);

export function BrsCardContent({ children }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <CardContent>
      <div className={classes.root}>{children}</div>
    </CardContent>
  );
}
export default BrsCardContent;
