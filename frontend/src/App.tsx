import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { userActionCreators } from './redux/modules/user/actions';
import theme from './theme';
import MainLayout from './layouts/MainLayout';
import useSocketEvent from './hooks/useSocketEvent';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useSocketEvent();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(userActionCreators.loginSuccess({ token }));
    }
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
