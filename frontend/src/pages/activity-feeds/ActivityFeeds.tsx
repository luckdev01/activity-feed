import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postActionCreators } from '../../redux/modules/posts/actions';
import { selectPosts } from '../../redux/modules/posts/selectors';
import ActivityFeedCard from '../../components/activity-feed-card';

const StyledBox = styled(Box)(({ theme }) => ({
  gap: theme.spacing(2),
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(300px,1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(300px,1fr)',
  },
}));

export default function ActivityFeeds() {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActionCreators.fetchPosts({ offset: 0, limit: 4 }));
  }, [dispatch]);

  return (
    <StyledBox>
      {posts.map(post => (
        <ActivityFeedCard key={post.id} data={post} />
      ))}
    </StyledBox>
  );
}
