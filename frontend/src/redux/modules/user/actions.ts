import { createAction } from '@reduxjs/toolkit';
import { ILoginData, ITokenPayload } from './types';

export const LOGIN_USER = 'user/login';
export const LOGIN_USER_SUCCESS = 'user/loginSuccess';
export const LOGIN_USER_FAILURE = 'user/loginFailure';
export const LOGOUT_USER = 'user/logout';
export const FETCH_USER = 'user/fetch';
export const FETCH_USER_SUCCESS = 'user/fetchSuccess';
export const FETCH_USER_FAILURE = 'user/fetchFailure';

export const userActionCreators = {
  loginUser: createAction<ILoginData>(LOGIN_USER),
  loginSuccess: createAction<ITokenPayload>(LOGIN_USER_SUCCESS),
  logoutUser: createAction(LOGOUT_USER),
  fetchUser: createAction(FETCH_USER),
};
