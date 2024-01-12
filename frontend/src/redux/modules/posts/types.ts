import { EntityState } from '@reduxjs/toolkit';
import { IUser } from '../user/types';

export type IPost = {
  id: number;
  user: IUser;
  postContent: string;
  likeCount: number;
  timeStamp: string;
};

export type IFetchPostParams = {
  offset: number;
  limit: number;
};

export type IPostDTO = {
  name: string;
  type: string;
  userId: string;
  eventTime: string;
};

export type PostState = EntityState<IPost, number> & {
  isLoading: boolean;
  isSaving: boolean;
  error: any;
};
