import React from 'react';

import { Button, Add } from '../../material';

export const AddButton = ({
  label = 'Add',
  addHandler,
  color = 'default',
  disabled,
}: {
  label?: string;
  addHandler: () => void;
  color?: 'primary' | 'secondary' | 'inherit' | 'default';
  disabled?: boolean;
}) => (
  <Button
    onClick={addHandler}
    // variant="contained"
    aria-label="Add"
    startIcon={<Add />}
    disabled={disabled}
  >
    Add
  </Button>
);

export default AddButton;
