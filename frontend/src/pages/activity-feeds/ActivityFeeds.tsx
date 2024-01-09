import Box from '@mui/material/Box';
import ActivityFeedCard from '../../components/activity-feed-card';
import { styled } from '@mui/material/styles';
import { activities } from '../../mock/data';

const StyledBox = styled(Box)(({ theme }) => ({
  gap: theme.spacing(2),
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(300px,1fr))',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'minmax(300px,1fr)',
  },
}));

export default function ActivityFeeds() {
  return (
    <StyledBox>
      {activities.map((activity) => (
        <ActivityFeedCard
          key={`${activity.username}-${activity.timeStamp}`}
          data={activity}
        />
      ))}
    </StyledBox>
  );
}
