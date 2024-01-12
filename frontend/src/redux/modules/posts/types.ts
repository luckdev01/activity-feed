import { EntityState } from '@reduxjs/toolkit';
import { IUser } from '../user/types';

export type IPost = {
  id: number;
  user: IUser;
  postContent: string;
  likeCount: number;
  timeStamp: string;
};

export type IFetchPostAPIParams = {
  offset: number;
  limit: number;
  query?: string;
};

export type IFetchPostParams = {
  limit: number;
  query?: string;
  more?: boolean;
};

export type IPostDTO = {
  postContent: string;
};

export type PostState = EntityState<IPost, number> & {
  isLoading: boolean;
  isSaving: boolean;
  error: any;
};
