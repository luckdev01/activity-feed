import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from '../routes';
import TopNavBar from './TopNavBar';
import useSocketEvent from '../hooks/useSocketEvent';

const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  minHeight: '100vh',
}));

const InnerContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  maxWidth: '1152px',
  margin: 'auto',
}));

const MainLayout = () => {
  useSocketEvent();

  return (
    <Router>
      <TopNavBar />
      <MainContainer component="main">
        <InnerContainer>
          <Toolbar />
          <MainRoutes />
        </InnerContainer>
      </MainContainer>
    </Router>
  );
};

export default MainLayout;
