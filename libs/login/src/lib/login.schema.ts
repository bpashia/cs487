import { Tag, User } from '@interfaces';
import * as yup from 'yup';
import { Login } from './login.interfaces';

const loginShape = {
  email: yup.string().ensure().required(),
  password: yup.string().ensure().required(),
};

export const loginSchema = yup.object<Login>().shape(loginShape);

const tagShape = {
  tagKeyword: yup.string().ensure().required(),
};
export const tagSchema = yup.object<Tag>().shape(tagShape);

const registerShape = {
  email: yup.string().ensure().required(),
  password: yup.string().ensure().required(),
  firstName: yup.string().ensure().required(),
  middleName: yup.string().ensure(),
  lastName: yup.string().ensure().required(),
  universityId: yup.number(),
  tags: yup.array().of<string>(yup.string()).min(1),
};
// id: number;
//   password: string;
//   firstName:string;
//   middleName?:string;
//   lastName:string;
//   email: string;
//   createdAt: Date;
//   universityId: number;
//   tags: Tag[];
//   subscribedPosts: number[];

export const registerSchema = yup.object<User>().shape(registerShape);
