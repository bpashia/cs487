import { Conversation } from '@interfaces';

export const sampleConversations: Conversation[] = [
  {
    subject: 'Soccer Practice Question',
    createdAt: new Date(),
    id: 1,
    users: [1, 50],
    messages: [
      {
        id: 1,
        postId: 1,
        from: 1,
        to: 50,
        createdAt: new Date(),
        content:
          'Hello, I was wondering if shin guards are required to participate. Thanks!',
      },
    ],
  },
  {
    subject: 'Turtle Club Question',
    createdAt: new Date(),
    id: 2,
    users: [50, 3],
    messages: [
      {
        id: 1,
        postId: 1,
        from: 50,
        to: 3,
        createdAt: new Date(),
        content: 'Hello I am interested in joining turtle club. What is it?',
      },
    ],
  },
  {
    subject: 'Garden Question',
    createdAt: new Date(),
    id: 3,
    users: [50, 3],
    messages: [
      {
        id: 1,
        postId: 1,
        from: 50,
        to: 3,
        createdAt: new Date(),
        content:
          'Should I bring my own dirt for the new garden? I make it myself',
      },
    ],
  },
];
