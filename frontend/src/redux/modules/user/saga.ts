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
import axiosInstance from '../../../services/axios-config';
import {
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
} from './actions';
import { ILoginData } from './types';

// Worker saga will be fired on LOGIN_USER actions
function* loginUser(
  action: PayloadAction<ILoginData>,
): Generator<PutEffect<IAction | Action> | CallEffect<any>, void, any> {
  try {
    const resp = yield call(UserAPI.login, action.payload);
    axiosInstance.defaults.headers.Authorization = `Bearer ${resp.token}`;
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: resp,
    });
    yield put({ type: FETCH_USER });
  } catch (error: any) {
    yield put({
      type: LOGIN_USER_FAILURE,
      payload: { error: error?.response?.data?.message || error.message },
    });
  }
}

function* fetchUser(
  action: Action,
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
  yield takeEvery(FETCH_USER, fetchUser);
}
