import { Navbar } from './components/Navbar/Navbar'
import { ThemeProvider } from '@material-ui/core'
import { getTheme } from './theme/Theme'
import { useState } from 'react'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode((oldValue) => !oldValue)
  }

  const theme = getTheme(darkMode)

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar toggleTheme={toggleTheme} />
      </div>
    </ThemeProvider>
  )
}

export default App
