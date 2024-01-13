import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActionCreators } from './redux/modules/user/actions';
import MainLayout from './layouts/MainLayout';
import useSocketEvent from './hooks/useSocketEvent';
import ThemeProvider from './contexts/ThemeProvider';
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
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

export default App;
