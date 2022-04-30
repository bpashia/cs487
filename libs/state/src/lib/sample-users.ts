import { User } from '@interfaces';
import { sampleTags } from './sample-tags';
export const sampleUsers: User[] = [
  {
    id: 1,
    password: 'Password123!',
    firstName: 'PseudoBroc',
    lastName: 'PsuedoPashia',
    email: 'bpashia@hawk.iit.edu',
    createdAt: new Date(),
    universityId: 1,
    subscribedPosts: [0, 1],
    tags: sampleTags,
  },
  {
    id: 2,
    password: 'Password123!',
    firstName: 'Ted',
    lastName: 'Tedderson',
    email: 'tempuser1@hawk.iit.edu',
    createdAt: new Date(),
    universityId: 1,
    subscribedPosts: [2, 3],
    tags: sampleTags,
  },
  {
    id: 3,
    password: 'Password123!',
    firstName: 'Jeff',
    lastName: 'Jefferson',
    email: 'tempuser2@hawk.iit.edu',
    createdAt: new Date(),
    universityId: 1,
    subscribedPosts: [0, 1],
    tags: sampleTags,
  },
];
