import * as yup from 'yup';
import { Post, Tag, PostContent } from '@interfaces';

const tagShape = {
  tagKeyword: yup.string().ensure().required(),
};

export const tagSchema = yup.object<Tag>().shape(tagShape);

const contentShape = {
  body: yup.string().ensure().required(),
  pictureAddress: yup.string().nullable(),
};
export const postContentSchema = yup.object<PostContent>().shape(contentShape);

const postShape = {
  tags: yup.array().of<string>(yup.string()).min(1),
  postedByEmail: yup.string().ensure().required(),
  postedById: yup.number().required(),

  title: yup.string().ensure().required(),
  content: postContentSchema,
  createdAt: yup.date().default(new Date()),
};

export const postSchema = yup.object<Post>().shape(postShape);
