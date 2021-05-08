import React from 'react';
import { Link } from 'react-router-dom';

import {
  Typography,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import ErrorBoundary from './error-boundary';

interface IconLinkProps {
  to?: string;
  Icon?: () => React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      // margin: theme.spacing(0),
      // border: '1px solid green',
      // hover: {
      //   color: 'green',
      // },
    },
  })
);

export function IconLink({ to, Icon }: IconLinkProps) {
  const classes = useStyles();
  return (
    <ErrorBoundary>
      <Link to={to} className={classes.link}>
        {/* <IconButton edge="start" className={classes.btn}> */}
        <Typography color="textPrimary">{Icon()}</Typography>
        {/* </IconButton> */}
        {/* {Icon()} */}
      </Link>
    </ErrorBoundary>
  );
}
