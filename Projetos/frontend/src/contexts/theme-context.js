import { createContext, useContext, useEffect, useState } from 'react';
import { getTheme } from '../styles/theme';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { getFromStorage, saveIntoStorage } from '../services/storage/local-storage-service';
import { QUERY } from '../services/constants';

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
  const [theme, setTheme] = useState(getTheme(darkMode));

  const onToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const themeStorage = getFromStorage(QUERY.THEME);
    if (themeStorage) {
      setDarkMode(themeStorage === 'true');
    }
  }, []);

  useEffect(() => {
    setTheme(getTheme(darkMode));
    saveIntoStorage(QUERY.THEME, darkMode);
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
