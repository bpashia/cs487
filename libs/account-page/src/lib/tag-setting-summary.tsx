import { User } from '@interfaces';
import {
  Delete,
  Edit,
  IconButton,
  Loading,
  Snackbar,
  Summary,
  Tooltip,
  Typography,
  useEditableCardApi,
} from '@broc-ui';

import { Alert } from '@material-ui/lab';

import React from 'react';
import { useAsync, useAsyncFn } from 'react-use';
import { AsyncState } from 'react-use/lib/useAsyncFn';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { useRecoilState } from 'recoil';
import { selectedUser, allUniversities } from '@cs487-app/state';

export const TagSettingsSummary = () => {
  const currentSelectedUser = useRecoilValueLoadable(selectedUser);

  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const getFields = (user: User) => {
    const fields = [
      {
        label: 'Tags',
        value: user.tags.map((t) => t.tagKeyword).join(', '),
      },
    ].filter((field) => field.value);
    return fields;
  };

  return currentSelectedUser.state === 'loading' ? (
    <Loading />
  ) : currentSelectedUser.contents ? (
    <Summary fields={getFields(currentSelectedUser.contents as User)} />
  ) : (
    <Typography>No User Tags</Typography>
  );
};
