import * as yup from 'yup';
import { CreditCard } from '@airline/airline-interfaces';

const creditCardShape = {
  email: yup.string().ensure().required(),
  addressID: yup.number().required(),
  creditCardNumber: yup.number().required(),
  securityCode: yup.number().required(),
  expirationDate: yup.date().required().default(new Date()),
};

export const creditCardSchema = yup.object<CreditCard>().shape(creditCardShape);
