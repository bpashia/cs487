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

import { Redirect, withRouter } from 'react-router';
import { selectedUser } from '@cs487-app/state';
import { Explore } from './explore';

export const ExplorePage = () => {
  const currentSelectedUser = useRecoilValueLoadable(selectedUser);
  console.log('ExplorePage');
  return (
    <div>
      {currentSelectedUser.state === 'hasValue' &&
      !currentSelectedUser.contents ? (
        <Typography variant="h4">
          Session timed out. Please log back in...
        </Typography>
      ) : (
        <Explore />
      )}
    </div>
  );
};

export default ExplorePage;
