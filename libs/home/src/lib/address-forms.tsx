import { Formik, useFormikContext,Form } from 'formik';
import React from 'react';
import { useAsyncFn } from 'react-use';

import {Address, AddressRequest, Api} from '@airline/airline-interfaces';
import { Customer } from '@airline/airline-interfaces';
import { Redirect } from 'react-router';
import { Snackbar, useEditableCardApi } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState } from 'recoil';
import{activeCustomer,customerAddresses} from '@login'
import { addressSchema } from './address.schema';
import { AddressFields } from './address-fields';



export const AddressForm = ()=>{
   
   const [currentActiveCustomer,setActiveCustomer]=useRecoilState<Customer>(activeCustomer);
   
   const addressInit = addressSchema.cast({email:currentActiveCustomer.email});
   const cardApi = useEditableCardApi()
   const [result, addAddress] = useAsyncFn(
    async (values: AddressRequest) => {
      const {
        data
      } = await Api.post<
        AddressRequest,
        Address
      >(`api/local/addresses`, 
      values
      );
      return data;
    },
    []
  );
  const [currentCustomerAddresses,setCurrentCustomerAddresses]=useRecoilState<Address[]>(customerAddresses);
  const [customerResult, getAddresses] = useAsyncFn(
    async (email: string) => {
      const {
        data
      } = await Api.get<
        
        Address[]
      >(`api/local/customers/addresses/${email}`);
      return data;
    },
    []
  );
    const onSubmit = async (values,actions) =>{
      console.log('HERE')
    await addAddress(values);
    await getAddresses(currentActiveCustomer.email);
    actions.setSubmitting(false);
    if(cardApi){cardApi.toggleEditMode()}
}
React.useEffect(()=>{
    if (customerResult.value){
        setCurrentCustomerAddresses(customerResult.value)
    }
},[customerResult, setCurrentCustomerAddresses]);

    return(
    <Formik<AddressRequest> initialValues={addressInit} onSubmit={onSubmit} validationSchema={addressSchema} enableReinitialize={true}>
      <Form>
        <AddressFields toggleEditMode={cardApi?cardApi.toggleEditMode:()=>{return}}/>
        </Form>
    </Formik>
  

    )
}