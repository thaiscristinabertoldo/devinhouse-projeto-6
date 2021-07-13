import { createContext, useContext, useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { getTheme } from "theme/themes";

//  const LOCAL_STORAGE_DARKMODE = process.env.REACT_APP_DARK_THEME; Está retornando undefined, verificar depois!!
const LOCAL_STORAGE_DARKMODE = "darkMode";

export const ThemesContext = createContext();

const ThemesProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState();

  function ToggleTheme() {
    setDarkMode((old) => !old);
  }

  useEffect(() => {
    const darkModeStorage = localStorage.getItem(LOCAL_STORAGE_DARKMODE);

    if (darkModeStorage) {
      setDarkMode(darkModeStorage === "true");
    }
  }, []);

  useEffect(() => {
    setTheme(getTheme(darkMode));
    localStorage.setItem(LOCAL_STORAGE_DARKMODE, darkMode);
  }, [darkMode]);

  return (
    <ThemesContext.Provider value={{ ToggleTheme, darkMode }}>
      <ThemeProvider theme={theme || getTheme(false)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemesContext.Provider>
  );
};

function useThemes() {
  const context = useContext(ThemesContext);

  if (!context) {
    throw new Error("useThemes must be involved by ThemesProvider!");
  }
  return context;
}

export { ThemesProvider, useThemes };
