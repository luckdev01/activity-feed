import {
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';

const ThemeProvider = ({ children }: { children?: ReactNode }) => {
  const [darkMode, _setDarkMode] = useState(true);

  useEffect(() => {
    _setDarkMode(localStorage.getItem('darkMode') === 'true');
  }, []);

  const curTheme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode],
  );

  const setDarkMode = useCallback(
    (mode: boolean) => {
      localStorage.setItem('darkMode', String(mode));
      _setDarkMode(mode);
    },
    [_setDarkMode],
  );

  const toggleTheme = useCallback(() => {
    setDarkMode(!darkMode);
  }, [setDarkMode, darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        toggleTheme,
      }}
    >
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={curTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
