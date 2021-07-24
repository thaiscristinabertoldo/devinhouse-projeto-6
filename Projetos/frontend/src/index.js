import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web';

import { AppThemeProvider } from './contexts/theme-context';
import { AuthProvider } from './contexts/auth-context';
import keycloak from './keycloak';

import './styles/globals.css';
import { ProcessListProvider } from './contexts/process-list-context';

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <AppThemeProvider>
        <AuthProvider>
          <ProcessListProvider>
            <App />
          </ProcessListProvider>
        </AuthProvider>
      </AppThemeProvider>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
