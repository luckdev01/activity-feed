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
} from './actions';
import { IPost } from './types';

const DEFAULT = {
  isLoading: false,
  isSaving: false,
  posts: [],
  error: null,
};

export function postReducer(state = DEFAULT, action: IAction) {
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
        ...state,
        isLoading: false,
        posts: payload.data,
      };
    }
    case FETCH_POSTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        posts: [] as IPost[],
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

    default: {
      return state;
    }
  }
}
