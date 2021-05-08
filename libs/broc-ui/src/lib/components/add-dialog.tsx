import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '../material';

export interface AddDialogueProps {
  title: string;
  id: string;
  content: React.ReactNode;
  isOpen: boolean;
  //   handleClose: () => void;
  //   handleConfirm: () => Promise<void>;
  handleCancel: () => void;
}
export const AddDialog = (props: AddDialogueProps) => {
  const { title, content, isOpen, handleCancel, ...other } = props;

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth="lg"
      aria-labelledby="add-dialog-title"
      open={isOpen}
      {...other}
    >
      <DialogTitle id="add-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        {/* <Button onClick={handleConfirm} color="primary">
          Ok
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default AddDialog;
