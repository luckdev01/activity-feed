import { createSelector } from 'reselect';
import { AppState } from '@/redux/store/types';
import { postsAdapter } from './reducer';

export const selectPostState = (state: AppState) => state.post;

export const selectPosts = createSelector(selectPostState, postState =>
  postsAdapter.getSelectors().selectAll(postState),
);

export const selectPostsCount = createSelector(selectPostState, postState =>
  postsAdapter.getSelectors().selectTotal(postState),
);

export const selectIsSaving = createSelector(
  selectPostState,
  postState => postState.isSaving,
);
