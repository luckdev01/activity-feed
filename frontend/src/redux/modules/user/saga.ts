import { Action, PayloadAction } from '@reduxjs/toolkit';
import {
  CallEffect,
  PutEffect,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { IAction } from '@/redux/store/types';
import { UserAPI } from '../../../services/user.service';
import { setAxiosToken } from '../../../services/axios-config';
import * as socketModule from '../../../services/socket';
import {
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from './actions';
import { ILoginData, ITokenPayload } from './types';

// Worker saga will be fired on LOGIN_USER actions
function* loginUser(
  action: PayloadAction<ILoginData>,
): Generator<PutEffect<IAction | Action> | CallEffect<any>, void, any> {
  try {
    const resp = yield call(UserAPI.login, action.payload);
    localStorage.setItem('authToken', resp.token);
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: { token: resp.token },
    });
  } catch (error: any) {
    yield put({
      type: LOGIN_USER_FAILURE,
      payload: { error: error?.response?.data?.message || error.message },
    });
  }
}

function* loginSuccess(action: PayloadAction<ITokenPayload>) {
  const token = action.payload.token;
  setAxiosToken(token);
  socketModule.initialize(token);
  yield put({ type: FETCH_USER });
}

function logoutUser(_action: PayloadAction<ILoginData>) {
  try {
    socketModule.getSocket()?.disconnect();
  } catch (error: any) {
    console.log(error);
  }
}

function* fetchUser(
  _action: Action,
): Generator<PutEffect<Action> | CallEffect<any>, void, any> {
  try {
    const resp = yield call(UserAPI.getProfile);
    yield put({
      type: FETCH_USER_SUCCESS,
      payload: resp,
    });
  } catch (error: any) {
    yield put({
      type: FETCH_USER_FAILURE,
      payload: { error: error.message },
    });
  }
}

export function* userSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGIN_USER_SUCCESS, loginSuccess);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(FETCH_USER, fetchUser);
}
