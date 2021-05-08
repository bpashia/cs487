import * as yup from 'yup';
import { AddressRequest } from '@airline/airline-interfaces';

const addressShape = {
  email: yup.string().ensure().required(),
  streetAddress: yup.string().ensure().required(),
  city: yup.string().ensure().required(),
  state: yup.string().ensure().required(),
  zip: yup.string().ensure().required(),
};

export const addressSchema = yup.object<AddressRequest>().shape(addressShape);
