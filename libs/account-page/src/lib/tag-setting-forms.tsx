import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';
import { useAsyncFn } from 'react-use';

import { TagSettings, tagSettingsSchema, userInfoSchema } from './user.schema';
import { Api, User } from '@interfaces';
import { Redirect } from 'react-router';
import { Snackbar, useEditableCardApi } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import { allUsers, selectedUser, tempId } from '@cs487-app/state';
import { TagSettingFields } from './tag-settings-fields';

function useOnSubmit(handleNext?: (...args: any) => void) {
  const [currentSelectedUser, setCurrentSelectedUser] = useRecoilState(
    selectedUser
  );
  const [currentAllUsers, setAllUsers] = useRecoilState(allUsers);
  const updateUser = (values: TagSettings) => {
    const allUsersExcludingCurrent = currentAllUsers.filter(
      (val) => val.id !== currentSelectedUser.id
    );
    setAllUsers([
      ...allUsersExcludingCurrent,
      {
        ...currentSelectedUser,
        tags: values.tags.map((t) => ({ tagKeyword: t })),
      },
    ]);
  };

  return async (values: TagSettings, { setSubmitting }) => {
    updateUser(values);
    setCurrentSelectedUser({
      ...currentSelectedUser,
      tags: values.tags.map((t) => ({ tagKeyword: t })),
    });
    setSubmitting(false);
    handleNext();
  };
}

export const TagSettingsForm = () => {
  const [currentSelectedUser, setCurrentSelectedUser] = useRecoilState(
    selectedUser
  );
  const cardApi = useEditableCardApi();
  const tagsInfoInit = tagSettingsSchema.cast({
    tags: currentSelectedUser.tags.map((val) => val.tagKeyword),
  });

  // const [result, registerCustomer] = useAsyncFn(
  //   async (customer: Partial<Customer>) => {
  //     const { data } = await Api.post<Customer, Customer>(
  //       `api/local/customers`,
  //       customer
  //     );
  //     return data;
  //   },
  //   []
  // );

  const onSubmit = useOnSubmit(() => {
    cardApi.toggleEditMode();
  });

  // const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  // React.useEffect(() => {
  //   console.log({ result });
  //   if (result.error || (result.value && !result.value.length)) {
  //     setErrorOpen(true);
  //   }
  //   if (result.value && result.value.length) {
  //     setActiveCustomer(result.value[0]);
  //   }
  // }, [result, setActiveCustomer]);

  return (
    <Formik<TagSettings>
      initialValues={tagsInfoInit}
      onSubmit={onSubmit}
      validationSchema={tagSettingsSchema}
      enableReinitialize={true}
    >
      <Form>
        <TagSettingFields />
      </Form>
    </Formik>
  );
};
