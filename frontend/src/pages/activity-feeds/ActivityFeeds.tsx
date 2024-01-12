import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPostDTO } from '@/redux/modules/posts/types';
import { postActionCreators } from '../../redux/modules/posts/actions';
import { selectPosts } from '../../redux/modules/posts/selectors';
import PostCard from '../../components/PostCard';
import FeedsToolbar from '../../components/FeedsToolbar';
import CreatePostDialog from '../../components/CreatePostDialog';

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
  const [open, setOpen] = useState(false);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActionCreators.fetchPosts({ limit: rowsPerTime }));
  }, []);

  const handleLoadMore = useCallback(() => {
    dispatch(postActionCreators.fetchPosts({ limit: rowsPerTime, more: true }));
  }, [dispatch]);

  const handleSearch = useCallback((keyword: string) => {
    console.log('search keyword=', keyword);
  }, []);

  const handlePost = useCallback((data: IPostDTO) => {
    console.log('Create post, data=', data);
  }, []);

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <FeedsToolbar onAdd={() => setOpen(true)} onSearch={handleSearch} />
        <StyledBox>
          {posts.map(post => (
            <PostCard key={post.id} data={post} />
          ))}
        </StyledBox>
        <Button variant="text" onClick={handleLoadMore}>
          Load More
        </Button>
      </Box>
      <CreatePostDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handlePost}
      />
    </>
  );
}
