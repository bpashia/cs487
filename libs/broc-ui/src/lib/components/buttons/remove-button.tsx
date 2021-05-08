import React, { useEffect } from 'react';
import {
  Router,
  Route,
  Link,
  useParams,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import { Button, Remove } from '../../material';

export const RemoveButton = ({
  label = 'Remove',
  removeHandler,
}: {
  label: string;
  removeHandler: () => void;
}) => {
  return (
    <Button
      onClick={removeHandler}
      variant="contained"
      aria-label="Remove"
      startIcon={<Remove />}
    >
      Remove
    </Button>
  );
};

export default RemoveButton;
