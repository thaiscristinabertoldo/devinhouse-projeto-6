import { createContext, useEffect, useReducer } from 'react';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import { deepPurple, indigo, lightBlue, pink } from '@material-ui/core/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: pink,
    secondary: deepPurple,
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: indigo,
    secondary: lightBlue,
  },
});

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, toggleTheme] = useReducer(
    (theme) => (theme?.palette?.mode === 'dark' ? lightTheme : darkTheme),
    localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    localStorage.setItem('theme', theme?.palette?.mode);
  }, [theme]);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export { ThemeProvider, ThemeContext };
