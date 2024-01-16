import { createEntityAdapter } from '@reduxjs/toolkit';
import { IAction } from '@/redux/store/types';
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
  ADD_NEW_FEED,
  CLEAR_NEW_FEEDS,
} from './actions';
import { IPost, PostState } from './types';

export const postsAdapter = createEntityAdapter<IPost, number>({
  selectId: post => post.id,
  sortComparer: (a, b) =>
    Date.parse(a.timeStamp) > Date.parse(b.timeStamp) ? -1 : 1, // sort by timeStamp on store
});

const DEFAULT: PostState = postsAdapter.getInitialState({
  isLoading: false,
  isSaving: false,
  error: null,
  newFeeds: [],
  hasMore: false,
});

export function postReducer(state = DEFAULT, action: IAction): PostState {
  const { type, payload } = action;

  switch (type) {
    case FETCH_POSTS: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...(payload.more
          ? postsAdapter.setMany(state, payload.data) // add more posts with payload
          : postsAdapter.setAll(state, payload.data)), // set new posts with payload
        isLoading: false,
        ...(payload.offset !== undefined // if fetching new feeds, don't change hasMore
          ? {}
          : { hasMore: payload.data.length >= payload.limit }),
      };
    }
    case FETCH_POSTS_FAILURE: {
      return {
        ...postsAdapter.removeAll(state),
        isLoading: false,
        error: payload.error,
      };
    }
    case CREATE_POST:
    case UPDATE_POST:
    case DELETE_POST: {
      return {
        ...state,
        isSaving: true,
        error: null,
      };
    }
    case CREATE_POST_SUCCESS:
    case UPDATE_POST_SUCCESS:
    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        isSaving: false,
      };
    }
    case CREATE_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case DELETE_POST_FAILURE: {
      return {
        ...state,
        isSaving: false,
        error: payload.error,
      };
    }
    /**
     * Add new feed from web socket
     */
    case ADD_NEW_FEED: {
      const { newFeeds } = state;
      return {
        ...state,
        newFeeds: newFeeds.includes(payload)
          ? newFeeds
          : [...newFeeds, payload],
      };
    }
    case CLEAR_NEW_FEEDS: {
      return {
        ...state,
        newFeeds: [],
      };
    }
    default: {
      return state;
    }
  }
}
