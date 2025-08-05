import { User } from './interface';

export const admin: User = {
  id: 1,
  name: 'Jose',
  email: 'josheorteg@gmail.com',
  avatar: 'images/avatar.jpg',
};

export const guest: User = {
  name: 'unknown',
  email: 'unknown',
  avatar: 'images/avatar-default.jpg',
};
