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
};

export type IFetchPostParams = {
  limit: number;
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
