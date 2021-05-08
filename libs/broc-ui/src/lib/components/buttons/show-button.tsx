import React from 'react';

import { Button, ExpandMore } from '../../material';

export const ShowButton = ({
  label = 'Show',
  showHandler,
  color = 'default'
}: {
  label?: string;
  showHandler: () => void;
  color?: 'primary' | 'secondary' | 'inherit' | 'default';
}) => (
  <Button
    onClick={showHandler}
    // variant="contained"
    aria-label="Show"
    startIcon={<ExpandMore />}
  >
    Show
  </Button>
);

export default ShowButton;
