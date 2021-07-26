import { createContext, useContext, useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { getFromStorage, saveIntoStorage } from '../services/storage/local-storage-service';
import { QUERY } from '../services/constants';
import { getTheme } from '../styles/theme-utils';

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
  const [viewAsGrid, setViewAsGrid] = useState(false);
  const [theme, setTheme] = useState(getTheme(darkMode));

  const onToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const onToggleView = () => {
    setViewAsGrid((prev) => !prev);
  };

  const loadInitialThemeFromStorage = () => {
    const themeStorage = getFromStorage(QUERY.THEME);
    if (themeStorage) {
      setDarkMode(themeStorage === 'true');
    }
  };

  const saveCurrentThemeIntoStorage = () => {
    setTheme(getTheme(darkMode));
    saveIntoStorage(QUERY.THEME, darkMode);
  };

  useEffect(loadInitialThemeFromStorage, []);
  useEffect(saveCurrentThemeIntoStorage, [darkMode]);

  return (
    <ThemeContext.Provider value={{ onToggleTheme, onToggleView, viewAsGrid, darkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
