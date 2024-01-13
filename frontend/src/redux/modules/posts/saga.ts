import {
  CallEffect,
  PutEffect,
  SelectEffectDescriptor,
  SimpleEffect,
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { IAction } from '@/redux/store/types';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { PostAPI } from '../../../services/post.service';
import {
  FETCH_POSTS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  CREATE_POST,
  CREATE_POST_FAILURE,
  CREATE_POST_SUCCESS,
  UPDATE_POST,
  UPDATE_POST_FAILURE,
  UPDATE_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  CLEAR_NEW_FEEDS,
} from './actions';
import { IFetchPostParams } from './types';
import { selectNewFeeds, selectPostsCount } from './selectors';

// Worker saga will be fired on FETCH_POSTS actions
function* fetchPosts(
  action: PayloadAction<IFetchPostParams>,
): Generator<
  | PutEffect<IAction | Action>
  | CallEffect<any>
  | SimpleEffect<'SELECT', SelectEffectDescriptor>,
  void,
  any
> {
  try {
    const { offset, more, limit, query } = action.payload;
    const postsCount = yield select(selectPostsCount);
    const newFeeds = yield select(selectNewFeeds);
    const realOffset =
      offset !== undefined ? offset : more ? newFeeds.length + postsCount : 0;
    const resp = yield call(PostAPI.getAll, {
      offset: realOffset,
      limit,
      query,
    });
    yield put({
      type: FETCH_POSTS_SUCCESS,
      payload: { data: resp, more },
    });
    if (!more) {
      yield put({ type: CLEAR_NEW_FEEDS });
    }
  } catch (error: any) {
    yield put({
      type: FETCH_POSTS_FAILURE,
      payload: { error },
    });
  }
}

function* createPost(
  action: IAction,
): Generator<PutEffect<IAction> | CallEffect<any>, void, any> {
  try {
    const resp = yield call(PostAPI.create, action.payload.data);
    yield put({
      type: CREATE_POST_SUCCESS,
      payload: { data: resp },
    });
  } catch (error: any) {
    yield put({
      type: CREATE_POST_FAILURE,
      payload: { error },
    });
  }
}

function* updatePost(
  action: IAction,
): Generator<PutEffect<IAction> | CallEffect<any>, void, any> {
  try {
    const resp = yield call(
      PostAPI.update,
      action.payload.id,
      action.payload.data,
    );
    yield put({
      type: UPDATE_POST_SUCCESS,
      payload: { data: resp },
    });
  } catch (error: any) {
    yield put({
      type: UPDATE_POST_FAILURE,
      payload: { error },
    });
  }
}

function* deletePost(
  action: IAction,
): Generator<PutEffect<IAction> | CallEffect<any>, void, any> {
  try {
    const resp = yield call(PostAPI.delete, action.payload.id);
    yield put({
      type: DELETE_POST_SUCCESS,
      payload: { data: resp },
    });
  } catch (error: any) {
    yield put({
      type: DELETE_POST_FAILURE,
      payload: { error },
    });
  }
}

// Starts fetchPosts on each dispatched FETCH_POSTS action
// Allows concurrent fetches of user
export function* postSaga() {
  yield takeEvery(FETCH_POSTS, fetchPosts);
  yield takeEvery(CREATE_POST, createPost);
  yield takeEvery(UPDATE_POST, updatePost);
  yield takeEvery(DELETE_POST, deletePost);
}
