import { createTheme } from '@material-ui/core';

export const darkTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#39516a',
    },
    secondary: {
      main: '#f08080',
    },
    error: {
      main: '#C11515',
    },
    contrasted: {
      main: '#e5eeff',
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#53afe2',
    },
    secondary: {
      main: '#f08080',
    },
    error: {
      main: '#C11515',
    },
  },
});
