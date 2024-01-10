import { createSelector } from 'reselect';
import { AppState } from '../../store/types';

export const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (userState) => userState.user,
);
