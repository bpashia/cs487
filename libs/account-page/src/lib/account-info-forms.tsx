import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';
import { useAsyncFn } from 'react-use';

import { userInfoSchema } from './user.schema';
import { Api, User } from '@interfaces';
import { Redirect } from 'react-router';
import { Snackbar, useEditableCardApi } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import { AccountInfoFields } from './account-info-fields';
import { allUsers, selectedUser, tempId } from '@cs487-app/state';

function useOnSubmit(handleNext?: (...args: any) => void) {
  const [currentSelectedUser, setCurrentSelectedUser] = useRecoilState(
    selectedUser
  );
  const [currentAllUsers, setAllUsers] = useRecoilState(allUsers);
  const updateUser = (newUser: User) => {
    const allUsersExcludingCurrent = currentAllUsers.filter(
      (val) => val.id !== newUser.id
    );
    setAllUsers([...allUsersExcludingCurrent, newUser]);
  };

  return async (values: User, { setSubmitting }) => {
    const toSubmit: User = {
      ...values,
    };
    updateUser(toSubmit);
    setCurrentSelectedUser(toSubmit);
    setSubmitting(false);
    handleNext();
  };
}

export const AccountInfoForm = () => {
  const [currentSelectedUser, setCurrentSelectedUser] = useRecoilState(
    selectedUser
  );
  const cardApi = useEditableCardApi();
  const userInfoInit = userInfoSchema.cast(currentSelectedUser);

  const [result, registerUser] = useAsyncFn(async (customer: Partial<User>) => {
    const { data } = await Api.post<User, User>(
      `api/local/customers`,
      customer
    );
    return data;
  }, []);

  const onSubmit = useOnSubmit(() => {
    cardApi.toggleEditMode();
  });

  return (
    <Formik<User>
      initialValues={userInfoInit}
      onSubmit={onSubmit}
      validationSchema={userInfoSchema}
      enableReinitialize={true}
    >
      <Form>
        <AccountInfoFields />
      </Form>
    </Formik>
  );
};
