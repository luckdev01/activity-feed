import { Dispatch, createContext } from 'react';

export const ThemeContext = createContext<{
  darkMode: boolean;
  setDarkMode: Dispatch<boolean>;
  toggleTheme: () => void;
}>({
  darkMode: false,
  setDarkMode: (value: boolean) => {
    /* no op */
  },
  toggleTheme: () => {
    /* no op */
  },
});
