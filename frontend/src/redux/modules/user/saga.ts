import { PayloadAction } from '@reduxjs/toolkit';
import {
  CallEffect,
  PutEffect,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { IAction } from '@/redux/store/types';
import { UserAPI } from '../../../services/user.service';
import { LOGIN_USER, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS } from './actions';
import { ILoginData } from './types';

// Worker saga will be fired on LOGIN_USER actions
function* loginUser(
  action: PayloadAction<ILoginData>,
): Generator<PutEffect<IAction> | CallEffect<any>, void, any> {
  try {
    const resp = yield call(UserAPI.login, action.payload);
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: resp,
    });
  } catch (error: any) {
    yield put({
      type: LOGIN_USER_FAILURE,
      payload: { error },
    });
  }
}

export function* userSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
}
