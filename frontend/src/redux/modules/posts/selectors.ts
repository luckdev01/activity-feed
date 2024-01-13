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

export const selectLoadingPosts = createSelector(
  selectPostState,
  postState => postState.isLoading,
);

export const selectHasMore = createSelector(
  selectPostState,
  postState => postState.hasMore,
);

export const selectIsSaving = createSelector(
  selectPostState,
  postState => postState.isSaving,
);

export const selectNewFeeds = createSelector(
  selectPostState,
  postState => postState.newFeeds,
);
