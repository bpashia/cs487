import React, { SyntheticEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {
  useNotificationsState,
  useNotificationsApi,
} from './notifications-provider';

import { BrsSnackbarContent, anchorOrigin } from './snackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  })
);

export const Notifications = () => {
  const { open, notification } = useNotificationsState();
  const { showMessage, handleClose, handleExited } = useNotificationsApi();

  return (
    <div>
      <Snackbar
        key={notification ? notification.key : undefined}
        open={open}
        anchorOrigin={anchorOrigin}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        // message={
        //   <span id="message-id">
        //     {notification ? notification.message : undefined}
        //   </span>
        // }
      >
        <BrsSnackbarContent onClose={handleClose} notification={notification} />
      </Snackbar>
    </div>
  );
};
export default Notifications;
