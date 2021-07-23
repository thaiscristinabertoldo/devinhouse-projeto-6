import { createTheme } from '@material-ui/core';

export const darkTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#39516a',
    },
    secondary: {
      main: '#ffb300',
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      /* main: '#ed143d',*/
      main: '#53afe2',
    },
    secondary: {
      main: '#ffb300',
    },
  },
});
