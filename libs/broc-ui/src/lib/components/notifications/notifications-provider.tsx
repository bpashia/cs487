import React, { SyntheticEvent } from 'react';
import { SnackbarContentVariant, Notification } from './snackbar';

export interface NotificationsState {
  open: boolean;
  notification?: Notification;
}

export interface NotificationsApi {
  showMessage: (message: string, variant: SnackbarContentVariant) => void;
  handleClose: (event: SyntheticEvent | MouseEvent, reason?: string) => void;
  handleExited: () => void;
}

export const NotificationsStateContext = React.createContext<
  NotificationsState | undefined
>(undefined);

export const NotificationsApiContext = React.createContext<
  NotificationsApi | undefined
>(undefined);

export function useCreateNotifications(): [
  NotificationsState,
  NotificationsApi
] {
  const queueRef = React.useRef<Notification[]>([]);

  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState<
    Notification | undefined
  >(undefined);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setNotification(queueRef.current.shift());
      setOpen(true);
    }
  };

  const showMessage = (message: string, variant: SnackbarContentVariant) => {
    // console.group('Show Message');
    // console.log({ message, queue: queueRef.current, variant });
    // console.groupEnd();

    queueRef.current.push({
      message,
      key: new Date().getTime(),
      variant,
    });

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  const ref = React.useRef({ showMessage, handleClose, handleExited });

  return [
    {
      open,
      notification,
    },
    ref.current,
  ];
}

export function useNotificationsState(): NotificationsState {
  const context = React.useContext(NotificationsStateContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationsState must be used within a NotificationsProvider'
    );
  }
  return context;
}

export function useNotificationsApi(): NotificationsApi {
  const context = React.useContext(NotificationsApiContext);
  if (context === undefined) {
    throw new Error(
      'useNotificationsDispatch must be used within a NotificationsProvider'
    );
  }
  return context;
}

export const NotificationsProvider = ({ children }) => {
  const [state, api] = useCreateNotifications();
  return (
    <NotificationsStateContext.Provider value={state}>
      <NotificationsApiContext.Provider value={api}>
        {children}
      </NotificationsApiContext.Provider>
    </NotificationsStateContext.Provider>
  );
};

export default NotificationsProvider;
