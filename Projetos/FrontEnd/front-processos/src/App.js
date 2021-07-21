import { ThemeProvider } from '@material-ui/core'
import { getTheme } from './theme/Theme'
import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'
import { AppRouter } from './routes'

const App = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode((oldValue) => !oldValue)
  }

  const theme = getTheme(darkMode)

  const eventLogger = (event, error) => {
    console.log('onKeycloakEvent', event, error)
  }

  const tokenLogger = (tokens) => {
    console.log('onKeycloakTokens', tokens)
  }

  return (
    <ReactKeycloakProvider authClient={keycloak} onEvent={eventLogger} onTokens={tokenLogger}>
      <ThemeProvider theme={theme}>
        <Navbar toggleTheme={toggleTheme} />
        <AppRouter />
      </ThemeProvider>
    </ReactKeycloakProvider>
  )
}

export default App
