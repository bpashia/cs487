import * as yup from 'yup';
import { Search } from '@interfaces';

const searchShape = {
  search: yup.string().ensure().nullable(),
};

export const searchSchema = yup.object<Search>().shape(searchShape);
