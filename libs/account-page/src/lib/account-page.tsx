import React from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  BrsCard,
  Card,
  EditableCard,
  EditableCardProvider,
  Grid,
  Typography,
} from '@broc-ui';

import { withRouter } from 'react-router';
import { selectedUser } from '@cs487-app/state';
import { useEditableCards } from './use-editables';

export const AccountPage = () => {
  const currentSelectedUser = useRecoilValueLoadable(selectedUser);
  const editables = useEditableCards();
  console.log('Account');

  return (
    <div>
      {currentSelectedUser.state === 'hasValue' &&
      !currentSelectedUser.contents ? (
        <Typography variant="h4">
          Session timed out. Please log back in...
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <EditableCard {...editables[0]} />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <EditableCard {...editables[1]} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AccountPage;
