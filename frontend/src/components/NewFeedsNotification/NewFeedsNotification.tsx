import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { selectNewFeeds } from '../../redux/modules/posts/selectors';
import { postActionCreators } from '../../redux/modules/posts/actions';

const StyledAlert = styled(Alert)(({ theme }) => ({
  '& .MuiAlert-icon': {
    display: 'none', // Hide the default icon
  },
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

export default function NewFeedsNotification() {
  const newFeeds = useSelector(selectNewFeeds);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      postActionCreators.fetchPosts({
        offset: 0,
        limit: newFeeds.length,
        more: true,
      }),
    );
    dispatch(postActionCreators.clearNewFeeds());
  };

  return (
    <>
      {newFeeds.length > 0 && (
        <StyledAlert severity="warning" onClick={handleClick}>
          There are {newFeeds.length} new{' '}
          {newFeeds.length === 1 ? 'feed' : 'feeds'}.
        </StyledAlert>
      )}
    </>
  );
}
