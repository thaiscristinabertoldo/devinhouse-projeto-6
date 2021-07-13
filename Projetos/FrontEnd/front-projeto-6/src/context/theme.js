import { createContext, useContext, useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { getTheme } from "theme/themes";

export const ThemesContext = createContext();

const ThemesProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState();

  function ToggleTheme() {
    setDarkMode((old) => !old);
  }

  useEffect(() => {
    setTheme(getTheme(darkMode));
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

export { ThemesProvider };

export const useThemes = () => useContext(ThemesContext);
