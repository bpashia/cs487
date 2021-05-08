import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';
import { useAsyncFn } from 'react-use';
import { LoginFields } from './login-fields';
import { Login } from './login.interfaces';
import { loginSchema, registerSchema } from './login.schema';
import { Address, Api } from '@airline/airline-interfaces';
import { Customer } from '@airline/airline-interfaces';
import { Redirect } from 'react-router';
import { Snackbar } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import { activeCustomer, customerAddresses } from './active-customer.recoil';
import { RegisterFields } from './register-fields';

export const RegisterForm = () => {
  const registerInit = registerSchema.cast({});
  const [currentActiveCustomer, setActiveCustomer] = useRecoilState(
    activeCustomer
  );
  const [result, registerCustomer] = useAsyncFn(
    async (customer: Partial<Customer>) => {
      const { data } = await Api.post<Customer, Customer>(
        `api/local/customers`,
        customer
      );
      return data;
    },
    []
  );
  const onSubmit = (values, actions) => {
    registerCustomer(values);
    setActiveCustomer(values);
    actions.setSubmitting(false);
  };

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
      <Formik<Customer>
        initialValues={registerInit}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
        enableReinitialize={true}
      >
        <Form>
          <RegisterFields />
        </Form>
      </Formik>
      {result.value ? <Redirect to="../home" /> : <div />}
    </>
  );
};
