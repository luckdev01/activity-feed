import { createAction } from '@reduxjs/toolkit';
import { IFetchPostParams, IPostDTO } from './types';

export const FETCH_POSTS = 'posts/fetch';
export const FETCH_POSTS_SUCCESS = 'posts/fetchSuccess';
export const FETCH_POSTS_FAILURE = 'posts/fetchFailure';
export const CREATE_POST = 'posts/create';
export const CREATE_POST_SUCCESS = 'posts/createSuccess';
export const CREATE_POST_FAILURE = 'posts/createFailure';
export const UPDATE_POST = 'posts/update';
export const UPDATE_POST_SUCCESS = 'posts/updateSuccess';
export const UPDATE_POST_FAILURE = 'posts/updateFailure';
export const DELETE_POST = 'posts/delete';
export const DELETE_POST_SUCCESS = 'posts/deleteSuccess';
export const DELETE_POST_FAILURE = 'posts/deleteFailure';
export const ADD_NEW_FEED = 'posts/addNewFeed';
export const CLEAR_NEW_FEEDS = 'posts/clearNewFeeds';

export const postActionCreators = {
  fetchPosts: createAction<IFetchPostParams>(FETCH_POSTS),
  createPost: createAction<{ data: IPostDTO }>(CREATE_POST),
  updatePost: createAction<{ id: number; data: IPostDTO }>(UPDATE_POST),
  deletePost: createAction<{ id: number }>(DELETE_POST),
  addNewFeed: createAction<number>(ADD_NEW_FEED),
  clearNewFeeds: createAction(CLEAR_NEW_FEEDS),
};
