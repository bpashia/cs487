import React from 'react';

import { Button, ExpandLess } from '../../material';

export const HideButton = ({
  label = 'Hide',
  hideHandler,
  color = 'default'
}: {
  label?: string;
  hideHandler: () => void;
  color?: 'primary' | 'secondary' | 'inherit' | 'default';
}) => (
  <Button
    onClick={hideHandler}
    // variant="contained"
    aria-label="Hide"
    startIcon={<ExpandLess />}
  >
    Hide
  </Button>
);

export default HideButton;
