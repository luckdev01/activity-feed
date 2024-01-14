import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { format } from 'date-fns';
import PostCard from './PostCard';

const testData = {
  id: 1,
  postContent: 'This is a test post.',
  likeCount: 20,
  timeStamp: '2024-01-08T11:10:00.000Z',
  user: {
    username: 'DavidLee',
    firstName: 'David',
    lastName: 'Lee',
    profileImage: 'https://mockimages/avatars/david.jpg',
  },
};

test('renders post information correctly', async () => {
  render(<PostCard data={testData} />);

  // Assert that the full name and content are rendered
  const titleElement = screen.getByText(
    `${testData.user.firstName} ${testData.user.lastName}`,
  );
  const contentElement = screen.getByText(testData.postContent);
  const timeElement = screen.getByText(
    format(new Date(testData.timeStamp), 'hh:mm a, MMM dd'),
  );
  const imageElement = screen.getByRole('img', { name: 'profile-logo' });

  expect(titleElement).toBeInTheDocument();
  expect(contentElement).toBeInTheDocument();
  expect(timeElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', testData.user.profileImage);
});
