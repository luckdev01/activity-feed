import { createAction } from '@reduxjs/toolkit';
import { IPostDTO } from './types';

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

export const postActionCreators = {
  fetchPosts: createAction(FETCH_POSTS),
  createPost: createAction<{ data: IPostDTO }>(CREATE_POST),
  updatePost: createAction<{ id: number; data: IPostDTO }>(UPDATE_POST),
  deletePost: createAction<{ id: number }>(DELETE_POST),
};
