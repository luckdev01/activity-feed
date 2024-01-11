import { createSelector } from 'reselect';
import { AppState } from '@/redux/store/types';

export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  userState => userState.user,
);

export const selectIsLoading = createSelector(
  selectUserState,
  userState => userState.isLoading,
);

export const selectIsAuthenticated = createSelector(
  selectUserState,
  userState => userState.isAuthenticated,
);
