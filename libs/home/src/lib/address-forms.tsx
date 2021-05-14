import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';
import { useAsyncFn } from 'react-use';

import { Address, AddressRequest, Api } from '@airline/airline-interfaces';
import { Customer } from '@airline/airline-interfaces';
import { Redirect } from 'react-router';
import { Snackbar, useEditableCardApi } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import { activeCustomer, customerAddresses, selectedAddress } from '@login';
import { addressSchema } from './address.schema';
import { AddressFields } from './address-fields';

export const AddressForm = () => {
  const [currentActiveCustomer, setActiveCustomer] = useRecoilState<Customer>(
    activeCustomer
  );
  const [currentSelectedAddress, setSelectedAddress] = useRecoilState<Address>(
    selectedAddress
  );
  const addressInit = !currentSelectedAddress
    ? addressSchema.cast({ email: currentActiveCustomer.email })
    : addressSchema.cast(currentSelectedAddress);
  const cardApi = useEditableCardApi();
  const [result, addAddress] = useAsyncFn(async (values: Address) => {
    const { data } = await Api.post<Address, Address>(
      `api/local/addresses`,
      values
    );
    return data;
  }, []);
  const [updateResult, updateAddress] = useAsyncFn(async (values: Address) => {
    const { data } = await Api.put<Address, Address>(
      `api/local/addresses/${values.addressID}`,
      values
    );
    return data;
  }, []);
  const [
    currentCustomerAddresses,
    setCurrentCustomerAddresses,
  ] = useRecoilState<Address[]>(customerAddresses);
  const [customerResult, getAddresses] = useAsyncFn(async (email: string) => {
    const { data } = await Api.get<Address[]>(
      `api/local/customers/addresses/${email}`
    );
    return data;
  }, []);
  const onSubmit = async (values, actions) => {
    console.log('HERE');
    const result = currentSelectedAddress
      ? updateAddress(values)
      : await addAddress(values);
    await getAddresses(currentActiveCustomer.email);
    setSelectedAddress(null);
    actions.setSubmitting(false);
    if (cardApi) {
      cardApi.toggleEditMode();
    }
  };
  React.useEffect(() => {
    if (customerResult.value) {
      setCurrentCustomerAddresses(customerResult.value);
    }
  }, [customerResult, setCurrentCustomerAddresses]);

  return (
    <Formik<Address>
      initialValues={addressInit}
      onSubmit={onSubmit}
      validationSchema={addressSchema}
      enableReinitialize={true}
    >
      <Form>
        <AddressFields
          toggleEditMode={
            cardApi
              ? cardApi.toggleEditMode
              : () => {
                  return;
                }
          }
        />
      </Form>
    </Formik>
  );
};
