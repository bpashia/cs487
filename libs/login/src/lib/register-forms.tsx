import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';
import { useAsyncFn } from 'react-use';
import { LoginFields } from './login-fields';
import { Login } from './login.interfaces';
import { loginSchema, registerSchema } from './login.schema';
import { Api, User } from '@interfaces';
import { Redirect } from 'react-router';
import { Snackbar } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import { RegisterFields } from './register-fields';
import { allUsers, selectedUser, tempId } from '@cs487-app/state';

interface UserRegistration extends Omit<User, 'tags'> {
  tags: string[];
}

function useOnSubmit(handleNext?: (...args: any) => void) {
  const [currentSelectedUser, setCurrentSelectedUser] = useRecoilState(
    selectedUser
  );
  const [currentAllUsers, setAllUsers] = useRecoilState(allUsers);
  const registerUser = (newUser: User) => {
    setAllUsers([...currentAllUsers, newUser]);
  };

  const [newTempId, setTempId] = useRecoilState<number>(tempId);

  return async (values: UserRegistration, { setSubmitting }) => {
    const newId = newTempId;
    setTempId(newTempId + 1);
    const toSubmit: User = {
      ...values,
      id: newId,
      subscribedPosts: [],
      createdAt: new Date(),
      tags: values.tags?.length
        ? values.tags.map((val) => ({ tagKeyword: val }))
        : [],
    };
    registerUser(toSubmit);
    setCurrentSelectedUser(toSubmit);
    setSubmitting(false);
  };
}

export const RegisterForm = () => {
  const registerInit = registerSchema.cast({});
  const [currentSelectedUser, setCurrentSelectedUser] = useRecoilState(
    selectedUser
  );

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
    //nothing
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
    <>
      <Formik<UserRegistration>
        initialValues={registerInit}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
        enableReinitialize={true}
      >
        <Form>
          <RegisterFields />
        </Form>
      </Formik>
      {currentSelectedUser ? <Redirect to="../home" /> : <div />}
    </>
  );
};
