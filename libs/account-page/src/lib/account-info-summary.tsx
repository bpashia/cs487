import { Api, User } from '@interfaces';
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

export const AccountInfoSummary = () => {
  const currentSelectedUser = useRecoilValueLoadable(selectedUser);
  const allCurrentUniversities = useRecoilValue(allUniversities);

  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  const getFields = (user: User) => {
    const userUniversity = allCurrentUniversities.find(
      (uni) => uni.id === user.universityId
    );
    console.log({ userUniversity, allCurrentUniversities });
    const fields = [
      {
        label: 'Name',
        value: [user.firstName, user.middleName, user.lastName]
          .filter((v) => !!v)
          .join(' '),
      },
      {
        label: 'Email',
        value: user.email,
      },
      {
        label: 'University',
        value: userUniversity?.universityName,
      },
      {
        label: 'Posts Subscribed To',
        value: String(user.subscribedPosts?.length || 0),
      },
    ].filter((field) => field.value);
    return fields;
  };

  return currentSelectedUser.state === 'loading' ? (
    <Loading />
  ) : currentSelectedUser.contents ? (
    <Summary fields={getFields(currentSelectedUser.contents as User)} />
  ) : (
    <Typography>No User Info</Typography>
  );
};
