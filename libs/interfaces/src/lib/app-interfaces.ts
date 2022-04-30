export interface Tag {
  tagKeyword: string;
}
export interface User {
  id: number;
  password: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  createdAt: Date;
  universityId: number;
  tags: Tag[];
  subscribedPosts: number[];
}
export interface PostContent {
  body: string;
  pictureAddress?: string;
}

export interface Post {
  id: number;
  tags: Tag[];
  postedByEmail: string;
  postedById: number;
  title: string;
  content: PostContent;
  createdAt: Date;
}

export interface Conversation {
  id: number;
  subject: string;
  messages: Message[];
  users: number[];
  createdAt: Date;
}

export interface Message {
  id: number;
  postId: number;
  from: number;
  to: number;
  createdAt: Date;
  content: string;
}

export interface University {
  id: number;
  universityName: string;
}

export interface Search {
  search: string;
}

export interface NewConversation
  extends Omit<Conversation, 'messages' | 'users' | 'id'> {
  firstMessage: string;
  toEmail: string;
}

export interface ApiResponse<T extends unknown = unknown> {
  error?: string;
  data?: T;
}
