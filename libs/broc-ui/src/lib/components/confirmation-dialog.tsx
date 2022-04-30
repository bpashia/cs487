import React from 'react';
import { Theme } from '@material-ui/core/styles';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
  makeStyles,
  createStyles,
} from '../material';

export interface ConfirmationDialogRawProps {
  classes: Record<'paper', string>;
  id: string;
  text: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => Promise<void>;
  handleCancel: () => void;
  title: string;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const {
    handleClose,
    handleCancel,
    handleConfirm,
    text,
    open,
    title,
    ...other
  } = props;
  // const [text, setText] = React.useState(textProp);
  // React.useEffect(() => {
  //   if (!open) {
  //     setText(textProp);
  //   }
  // }, [textProp, open]);

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      width: '80%',
      maxHeight: 435,
    },
  })
);

export interface ConfirmationDialogProps {
  id: string;
  text: string;
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => Promise<void>;
  handleCancel: () => void;
}

export function ConfirmationDialog({
  id,
  isOpen,
  title,
  text,
  handleClose,
  handleConfirm,
  handleCancel = function () {
    //empty
  },
}: ConfirmationDialogProps) {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    (isOpen && (
      <div className={classes.root}>
        <ConfirmationDialogRaw
          classes={{
            paper: classes.paper,
          }}
          id={id}
          open={true}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          text={text}
          title={title}
        />
      </div>
    )) ||
    null
  );
}
export default ConfirmationDialog;
