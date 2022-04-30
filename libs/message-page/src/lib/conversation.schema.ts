import * as yup from 'yup';
import { Conversation, Message, NewConversation } from '@interfaces';

const messageShape = {
  id: yup.number().required(),
  postId: yup.number().nullable(),
  from: yup.number().required(),
  to: yup.number().required(),
  createdAt: yup.date().required(),
  content: yup.string().ensure().required(),
};
export const messageSchema = yup.object<Message>().shape(messageShape);

const newConversationShape = {
  subject: yup.string().ensure().required(),
  toEmail: yup.string().ensure().required(),
  createdAt: yup.date().required().default(new Date()),
  firstMessage: yup.string().ensure().required(),
};

export const newConversationSchema = yup
  .object<NewConversation>()
  .shape(newConversationShape);
