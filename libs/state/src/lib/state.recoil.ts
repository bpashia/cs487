import {
  Conversation,
  Post,
  Tag,
  University,
  User,
  NewConversation,
} from '@interfaces';
import React from 'react';
import { atom } from 'recoil';
import { sampleConversations } from './sample-conversations';
import { samplePosts } from './sample-posts';
import { sampleTags } from './sample-tags';
import { sampleUsers } from './sample-users';

export const tempId = atom<number>({
  key: 'tempId', // unique ID (with respect to other atoms/selectors)
  default: 50, // default value (aka initial value)
});

export const allUsers = atom<User[]>({
  key: 'allUsers', // unique ID (with respect to other atoms/selectors)
  default: sampleUsers, // default value (aka initial value)
});

export const selectedUser = atom<User>({
  key: 'selectedUser', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export const allUniversities = atom<University[]>({
  key: 'allUniversities', // unique ID (with respect to other atoms/selectors)
  default: [{ id: 1, universityName: 'Illinois Tech' }], // default value (aka initial value)
});

export const allTags = atom<Tag[]>({
  key: 'allTags', // unique ID (with respect to other atoms/selectors)
  default: sampleTags, // default value (aka initial value)
});

export const allPosts = atom<Post[]>({
  key: 'allPosts',
  default: samplePosts,
});
export const selectedPost = atom<Post>({
  key: 'selectedPost',
  default: null,
});

export const allConversations = atom<Conversation[]>({
  key: 'allConversations',
  default: sampleConversations,
});

export const selectedConversation = atom<Conversation>({
  key: 'selectedConversation',
  default: null,
});

export const selectedNewConversation = atom<NewConversation>({
  key: 'selectedNewConversation',
  default: null,
});
