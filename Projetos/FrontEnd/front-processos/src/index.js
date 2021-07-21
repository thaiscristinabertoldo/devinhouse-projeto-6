import * as React from 'react'
import ReactDOM from 'react-dom'

import { ReactKeycloakProvider } from '@react-keycloak/web'

import keycloak from './keycloak'
import { AppRouter } from './routes'


import './index.css'

const eventLogger = (event, error) => {
  console.log('onKeycloakEvent', event, error)
}

const tokenLogger = (tokens) => {
  console.log('onKeycloakTokens', tokens)
}

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={eventLogger}
      onTokens={tokenLogger}
    >
      <AppRouter />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
