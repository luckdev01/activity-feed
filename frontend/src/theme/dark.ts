import { createTheme } from '@mui/material/styles';
import { green, grey, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    background: {
      default: grey[800],
    },
  },
});

export default theme;
