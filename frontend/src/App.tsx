import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './redux/store';
import theme from './theme';
import { socket } from './socket';
import MainLayout from './layouts/MainLayout';
import './App.css';

type IPostEventPayload = any;

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onPostEvent(payload: IPostEventPayload) {
      console.log('Post Event: ', payload);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('postEvent', onPostEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('postEvent', onPostEvent);
    };
  }, []);

  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout />
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
