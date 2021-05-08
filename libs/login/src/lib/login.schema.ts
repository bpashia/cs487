import { Customer } from '@airline/airline-interfaces';
import * as yup from 'yup';
import { Login } from './login.interfaces';

const loginShape = {
  email: yup.string().ensure().required(),
};

export const loginSchema = yup.object<Login>().shape(loginShape);

const registerShape = {
  email: yup.string().ensure().required(),
  firstName: yup.string().ensure().required(),
  middleName: yup.string().ensure(),
  lastName: yup.string().ensure().required(),
  homeAirport: yup.string().ensure(),
};

export const registerSchema = yup.object<Customer>().shape(registerShape);
