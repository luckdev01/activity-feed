import { createSelector } from 'reselect';
import { AppState } from '@/redux/store/types';

export const selectPostState = (state: AppState) => state.post;

export const selectPosts = createSelector(
  selectPostState,
  (postState) => postState.posts,
);
