import { type PayloadAction } from '@reduxjs/toolkit';
import { PostState } from '../modules/posts/types';
import { UserState } from '../modules/user/types';

export type IAction = PayloadAction<any>;

export type AppState = {
  post: PostState;
  user: UserState;
};
