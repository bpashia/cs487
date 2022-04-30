import React from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  BrsCard,
  Card,
  EditableCard,
  EditableCardProvider,
  Grid,
  Typography,
  ConversationTable,
  DialogContent,
  DialogTitle,
  Dialog,
} from '@broc-ui';

import { Redirect, withRouter } from 'react-router';
import {
  selectedUser,
  allConversations,
  selectedNewConversation,
} from '@cs487-app/state';
import { Conversation, NewConversation } from '@interfaces';
import { compareDesc } from 'date-fns';
import { NewConversationForm } from './conversation-form';

export const MessagesPage = () => {
  const currentSelectedUser = useRecoilValueLoadable(selectedUser);
  const [allCurrentConversations, setAllCurrentConversations] = useRecoilState<
    Conversation[]
  >(allConversations);
  const [
    currentUserConversations,
    setCurrentUserConversations,
  ] = React.useState<Conversation[]>(
    allCurrentConversations
      .filter((convo) =>
        convo.users.includes(currentSelectedUser.getValue()?.id)
      )
      .sort((a, b) => compareDesc(a.createdAt, b.createdAt))
  );
  const currentSelectedNewConversation = useRecoilValue<NewConversation>(
    selectedNewConversation
  );
  const [dialogState, setDialogOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (currentSelectedNewConversation) {
      setDialogOpen(true);
    } else {
      if (!currentSelectedNewConversation) {
        setDialogOpen(false);
      }
    }
  }, [currentSelectedNewConversation, setDialogOpen]);

  React.useEffect(() => {
    setCurrentUserConversations(
      allCurrentConversations
        .filter((convo) =>
          convo.users.includes(currentSelectedUser.getValue()?.id)
        )
        .sort((a, b) => compareDesc(a.createdAt, b.createdAt))
    );
  }, [
    allCurrentConversations,
    setCurrentUserConversations,
    currentSelectedUser,
  ]);

  console.log('MessagePage');

  return currentSelectedUser.state === 'hasValue' &&
    !currentSelectedUser.contents ? (
    <Typography variant="h4">
      Session timed out. Please log back in...
    </Typography>
  ) : (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <ConversationTable rows={currentUserConversations} />
        </Grid>
      </Grid>
      <Dialog disableBackdropClick open={dialogState}>
        <DialogTitle id="confirmation-dialog-title">
          {'New Conversation'}
        </DialogTitle>
        <DialogContent dividers>
          <NewConversationForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessagesPage;
