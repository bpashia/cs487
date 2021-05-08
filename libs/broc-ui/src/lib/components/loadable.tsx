import React from 'react';

import { CircularProgress, Typography } from '../material/material-ui';

export interface LoadableProps {
  isLoading: boolean;
  isError: boolean;
  message?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const Loading = ({ message = 'Loading...' }) => {
  return (
    <>
      {message ? <Typography>{message}</Typography> : null}
      <CircularProgress color="secondary" />
    </>
  );
};

export const Error = () => {
  return <div style={{ color: 'red', fontWeight: 'bold' }}>Error!</div>;
};

export const Loadable = ({
  children,
  isLoading = true,
  isError = false,
  message = 'Loading...'
}: LoadableProps) => {
  return isLoading ? (
    <Loading message={message} />
  ) : isError ? (
    <Error />
  ) : (
    <>{children}</>
  );
};
