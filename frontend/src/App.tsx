import React from 'react';
import { Provider } from 'react-redux';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './redux/store';
import theme from './theme';
import MainLayout from './layouts/MainLayout';
import './App.css';

function App() {
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
