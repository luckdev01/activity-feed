import { createAction } from '@reduxjs/toolkit';
import { ILoginData } from './types';

export const LOGIN_USER = 'user/login';
export const LOGIN_USER_SUCCESS = 'user/loginSuccess';
export const LOGIN_USER_FAILURE = 'user/loginFailure';
export const LOGOUT_USER = 'user/logout';

export const userActionCreators = {
  loginUser: createAction<ILoginData>(LOGIN_USER),
  logoutUser: createAction(LOGOUT_USER),
};
