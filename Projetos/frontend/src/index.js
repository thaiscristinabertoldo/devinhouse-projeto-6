import React from 'react';
import ReactDOM from 'react-dom';
import keycloak from './keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';

import { App } from './App';
import { AuthProvider } from './contexts/auth-context';
import { ProcessProvider } from './contexts/process-context';
import { AppThemeProvider } from './contexts/theme-context';

import './styles/globals.css';

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <AppThemeProvider>
        <AuthProvider>
          <ProcessProvider>
            <App />
          </ProcessProvider>
        </AuthProvider>
      </AppThemeProvider>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
