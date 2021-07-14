import { createTheme } from '@material-ui/core';

export const getTheme = (darkMode) =>
  createTheme({
    ...(darkMode ? themeDark : themeLight),
  });

export const themeDark = createTheme({
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

export const themeLight = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#53afe2',
    },
    secondary: {
      main: '#ffb300',
    },
  },
});
