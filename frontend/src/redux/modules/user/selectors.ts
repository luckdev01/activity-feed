import { createSelector } from 'reselect';
import { AppState } from '@/redux/store/types';

export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  userState => userState.user,
);

export const selectLogin = createSelector(
  selectUserState,
  userState => userState.login,
);

export const selectIsAuthenticated = createSelector(
  selectUserState,
  userState => userState.isAuthenticated,
);
