import { IAction } from '@/redux/store/types';
import {
  FETCH_USER,
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from './actions';
import { UserState } from './types';

const DEFAULT: UserState = {
  isAuthenticated: false,
  login: {
    isLoading: false,
    error: null,
  },
  user: {
    isLoading: false,
    data: null,
    error: null,
  },
};

export function userReducer(state = DEFAULT, action: IAction): UserState {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_USER: {
      return {
        ...state,
        login: {
          isLoading: true,
          error: null,
        },
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        login: {
          isLoading: false,
        },
        isAuthenticated: true,
      };
    }
    case LOGIN_USER_FAILURE: {
      return {
        ...state,
        login: {
          isLoading: false,
          error: payload.error,
        },
        isAuthenticated: false,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: false,
        user: {
          ...state.user,
          data: null,
        },
      };
    }
    case FETCH_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
          error: null,
        },
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          data: payload.user,
        },
      };
    }
    case FETCH_USER_FAILURE: {
      return {
        ...state,
        user: {
          isLoading: false,
          data: null,
          error: payload.error,
        },
      };
    }
    default: {
      return state;
    }
  }
}
