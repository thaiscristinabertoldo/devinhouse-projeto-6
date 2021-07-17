import { createContext, useContext, useEffect, useState } from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import { getTheme } from '../theme'

const CustomThemeContext = createContext()

const CustomThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)
  const [theme, setTheme] = useState()

  const onToggleTheme = () => {
    setDarkMode((oldValue) => !oldValue)
  }

  useEffect(() => {
    const themeStorage = localStorage.getItem(process.env.REACT_APP_DARK_THEME)

    if (themeStorage) {
      setDarkMode(themeStorage === 'true' ? true : false)
    }
  }, [])

  useEffect(() => {
    setTheme(getTheme(darkMode))
    localStorage.setItem(process.env.REACT_APP_DARK_THEME, darkMode)
  }, [darkMode])

  return (
    <CustomThemeContext.Provider value={{ onToggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  )
}

function useCustomTheme() {
  const context = useContext(CustomThemeContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { CustomThemeProvider, useCustomTheme }
