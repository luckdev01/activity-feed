import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postActionCreators } from '../../redux/modules/posts/actions';
import { selectPosts } from '../../redux/modules/posts/selectors';
import ActivityFeedCard from '../../components/activity-feed-card';

export const rowsPerTime = 4;

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
    dispatch(postActionCreators.fetchPosts({ limit: rowsPerTime }));
  }, []);

  const handleLoadMore = useCallback(() => {
    dispatch(postActionCreators.fetchPosts({ limit: rowsPerTime, more: true }));
  }, [dispatch]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <StyledBox>
        {posts.map(post => (
          <ActivityFeedCard key={post.id} data={post} />
        ))}
      </StyledBox>
      <Button variant="text" sx={{ mt: 2 }} onClick={handleLoadMore}>
        Load More
      </Button>
    </Box>
  );
}
