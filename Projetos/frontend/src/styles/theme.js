import { createTheme } from '@material-ui/core';

export const getTheme = (darkMode) =>
  createTheme({
    ...(darkMode ? darkTheme : lightTheme),
  });

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0f2c3d',
    },
    secondary: {
      main: '#ffb300',
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#53afe2',
    },
    secondary: {
      main: '#ffb300',
    },
  },
});
