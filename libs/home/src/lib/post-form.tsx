import { Formik, useFormikContext, Form } from 'formik';
import React from 'react';

import { Api, Post, User } from '@interfaces';
import { Redirect } from 'react-router';
import { Loading, Snackbar } from '@broc-ui';
import { Alert } from '@material-ui/lab';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

import {
  allPosts,
  allUsers,
  selectedPost,
  selectedUser,
  tempId,
} from '@cs487-app/state';
import { postSchema } from './post.schema';
import { PostFields } from './post-fields';

interface PostData extends Omit<Post, 'tags'> {
  tags: string[];
}

function useOnSubmit(handleNext?: (...args: any) => void) {
  const [currentSelectedPost, setSelectedPost] = useRecoilState<Post>(
    selectedPost
  );
  const [currentAllPosts, setAllPosts] = useRecoilState(allPosts);
  const addPost = (newPost: Post) => {
    setAllPosts([
      ...currentAllPosts.filter((p) => p.id !== newPost.id),
      newPost,
    ]);
  };

  const [newTempId, setTempId] = useRecoilState<number>(tempId);

  return async (values: PostData, { setSubmitting }) => {
    const newId = values.id ? values.id : newTempId;
    if (!values.id) {
      setTempId(newTempId + 1);
    }
    const toSubmit: Post = {
      ...values,
      id: newId,
      tags: values.tags?.length
        ? values.tags.map((val) => ({ tagKeyword: val }))
        : [],
    };
    addPost(toSubmit);
    setSelectedPost(null);
    setSubmitting(false);
  };
}

export const PostForm = () => {
  const currentSelectedPost = useRecoilValue(selectedPost);

  const onSubmit = useOnSubmit(() => {
    //nothing
  });

  return !currentSelectedPost ? (
    <Loading />
  ) : (
    <Formik<PostData>
      initialValues={postSchema.cast({
        ...currentSelectedPost,
        tags: currentSelectedPost.tags.map((tag) => tag.tagKeyword),
      })}
      onSubmit={onSubmit}
      validationSchema={postSchema}
      enableReinitialize={true}
    >
      <Form>
        <PostFields />
      </Form>
    </Formik>
  );
};
