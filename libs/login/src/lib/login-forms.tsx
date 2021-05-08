import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';
import { useAsyncFn } from 'react-use';
import { LoginFields } from './login-fields';
import { Login } from './login.interfaces';
import { loginSchema } from './login.schema';
import { Address, Api } from '@airline/airline-interfaces';
import { Customer } from '@airline/airline-interfaces';
import { Redirect } from 'react-router';
import { Snackbar } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import { activeCustomer, customerAddresses } from './active-customer.recoil';

export const LoginForm = () => {
  const loginInit = loginSchema.cast({});
  const [currentActiveCustomer, setActiveCustomer] = useRecoilState(
    activeCustomer
  );
  const [result, loginCustomer] = useAsyncFn(async (email: string) => {
    const { data } = await Api.put<{ email: string }, Customer[]>(
      `api/local/customers/login`,
      {
        email,
      }
    );
    return data;
  }, []);
  const onSubmit = (values, actions) => {
    console.log('HERE');
    loginCustomer(values.email);
    actions.setSubmitting(false);
  };

  const [errorOpen, setErrorOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    console.log({ result });
    if (result.error || (result.value && !result.value.length)) {
      setErrorOpen(true);
    }
    if (result.value && result.value.length) {
      setActiveCustomer(result.value[0]);
    }
  }, [result, setActiveCustomer]);

  return (
    <>
      <Formik<Login>
        initialValues={loginInit}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
        enableReinitialize={true}
      >
        <Form>
          <LoginFields />
        </Form>
      </Formik>
      {result.value?.length ? <Redirect to={'./home'} /> : <div />}
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert onClose={() => setErrorOpen(false)} severity="error">
          Invalid Login. Please try a different email.
        </Alert>
      </Snackbar>
    </>
  );
};
