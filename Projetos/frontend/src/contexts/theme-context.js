import { createContext, useContext, useEffect, useState } from 'react';
import { getTheme } from '../styles/theme';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { getFromStorage, saveIntoStorage } from '../services/storage/local-storage-service';

const ThemeContext = createContext();

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider.');
  }

  return context;
}

export const AppThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState();

  const onToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const themeStorage = getFromStorage(process.env.REACT_APP_DARK_THEME);
    if (themeStorage) {
      setDarkMode(themeStorage === 'true');
    }
  }, []);

  useEffect(() => {
    setTheme(getTheme(darkMode));
    saveIntoStorage(process.env.REACT_APP_DARK_THEME, darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ onToggleTheme, darkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
