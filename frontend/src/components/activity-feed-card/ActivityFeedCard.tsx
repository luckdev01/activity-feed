import { format } from 'date-fns';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { IPost } from '../../redux/modules/posts/types';

const StyledCard = styled(Card)(() => ({
  maxWidth: '100%',
  margin: 'auto',
  width: 500,
}));

type Props = {
  data: IPost;
};

export default function ActivityFeedCard({ data }: Props) {
  return (
    <StyledCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
            <img
              style={{ width: 48 }}
              src={data.profileImage}
              alt="profile-logo"
            />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={data.username}
        subheader={format(new Date(data.timeStamp), 'hh:mm a, MMM dd')}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.postContent}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <Typography>{data.likeCount}</Typography>
      </CardActions>
    </StyledCard>
  );
}
