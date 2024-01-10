import { IAction } from '../../store/types';
import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from './actions';

const DEFAULT = {
  isLoading: false,
  token: null,
  user: null,
  error: null,
};

export function userReducer(state = DEFAULT, action: IAction) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_USER: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        token: payload.data,
      };
    }
    case LOGIN_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        token: null,
        error: payload.error,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        token: null,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
}
