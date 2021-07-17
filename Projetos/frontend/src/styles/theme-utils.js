import { createTheme } from '@material-ui/core';
import { darkTheme, lightTheme } from './theme-styles';

export const getTheme = (darkMode) =>
  createTheme({
    ...(darkMode ? darkTheme : lightTheme),
  });
