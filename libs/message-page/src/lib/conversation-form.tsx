import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';

import { Post, User, NewConversation, Conversation } from '@interfaces';
import { Redirect } from 'react-router';
import { Loading, Snackbar } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

import {
  allConversations,
  allPosts,
  allUsers,
  selectedNewConversation,
  selectedPost,
  selectedUser,
  tempId,
} from '@cs487-app/state';

import { newConversationSchema } from './conversation.schema';
import { NewConversationFields } from './conversation-fields';

function useOnSubmit(handleNext?: (...args: any) => void) {
  const [
    currentSelectedNewConversation,
    setSelectedNewConversation,
  ] = useRecoilState<NewConversation>(selectedNewConversation);
  const [allCurrentConversations, setAllCurrentConversations] = useRecoilState<
    Conversation[]
  >(allConversations);
  const allCurrentUsers = useRecoilValue<User[]>(allUsers);
  const currentUser = useRecoilValue<User>(selectedUser);

  const addConversation = (conversation: Conversation) => {
    setAllCurrentConversations([
      ...allCurrentConversations.filter((p) => p.id !== conversation.id),
      conversation,
    ]);
  };

  const [newTempId, setTempId] = useRecoilState<number>(tempId);

  return async (values: NewConversation, { setSubmitting }) => {
    const newId = newTempId;

    setTempId(newTempId + 2);
    const toUser = allCurrentUsers.find(
      (user) => user.email === values.toEmail
    );
    // if (toUser) {
    const toSubmit: Conversation = {
      id: newId,
      subject: values.subject,
      createdAt: values.createdAt,
      users: [toUser.id, currentUser.id],
      messages: [
        {
          id: newId + 1,
          postId: null,
          from: currentUser.id,
          to: toUser.id,
          createdAt: new Date(),
          content: values.firstMessage,
        },
      ],
    };
    addConversation(toSubmit);
    setSelectedNewConversation(null);
    // } else {
    //   setFieldError(
    //     'toEmail',
    //     `User ${values.toEmail} not found. Please enter a valid user email.`
    //   );
    // }
    setSubmitting(false);
  };
}

export const NewConversationForm = () => {
  const currentSelectedNewConversation = useRecoilValue(
    selectedNewConversation
  );

  const onSubmit = useOnSubmit(() => {
    //nothing
  });

  return !currentSelectedNewConversation ? (
    <Loading />
  ) : (
    <Formik<NewConversation>
      initialValues={newConversationSchema.cast(currentSelectedNewConversation)}
      onSubmit={onSubmit}
      validationSchema={newConversationSchema}
      enableReinitialize={true}
    >
      <Form>
        <NewConversationFields />
      </Form>
    </Formik>
  );
};
