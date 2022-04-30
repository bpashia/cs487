import { Tag, User } from '@interfaces';
import * as yup from 'yup';

export interface TagSettings {
  tags: string[];
}

const tagShape = {
  tagKeyword: yup.string().ensure().required(),
};
export const tagSchema = yup.object<Tag>().shape(tagShape);

export const tagSettingsSchema = yup
  .object<TagSettings>()
  .shape({ tags: yup.array().of(yup.string()).min(1) });

const userInfoShape = {
  id: yup.number().required(),
  email: yup.string().ensure().required(),
  password: yup.string().ensure().required(),
  firstName: yup.string().ensure().required(),
  middleName: yup.string().ensure(),
  lastName: yup.string().ensure().required(),
  universityId: yup.number(),
  createdAt: yup.date().required(),
  tags: yup.array().of(tagSchema),
  subscribedPosts: yup.array().of(yup.number()),
};

export const userInfoSchema = yup.object<User>().shape(userInfoShape);
