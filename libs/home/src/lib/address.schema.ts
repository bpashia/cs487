import * as yup from 'yup';
import { Address, AddressRequest } from '@airline/airline-interfaces';

const addressShape = {
  addressID: yup.number().nullable(),
  email: yup.string().ensure().required(),
  streetAddress: yup.string().ensure().required(),
  city: yup.string().ensure().required(),
  state: yup.string().ensure().required(),
  zip: yup.string().ensure().required(),
};

export const addressSchema = yup.object<Address>().shape(addressShape);
