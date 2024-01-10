import { createSelector } from 'reselect';
import { AppState } from '../../store/types';

export const selectPostState = (state: AppState) => state.post;

export const selectPosts = createSelector(
  selectPostState,
  (postState) => postState.posts,
);
