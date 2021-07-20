import { ThemeProvider } from '@material-ui/core'
import { getTheme } from './theme/Theme'
import { useState } from 'react'
import { SearchBar } from './components/SearchBar/SearchBar'
import { HomeContainer } from './components/layout/HomeContainer/HomeContainer'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode(oldValue => !oldValue)
  }

  const theme = getTheme(darkMode)

  return (
    <ThemeProvider theme={theme}>
      <HomeContainer />
      <SearchBar />
    </ThemeProvider>
  )
}

export default App
