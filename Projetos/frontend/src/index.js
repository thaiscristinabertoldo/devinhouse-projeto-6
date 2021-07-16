import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { AppThemeProvider } from './contexts/theme-context';
import { AuthProvider } from './contexts/auth-context';

ReactDOM.render(
  <React.StrictMode>
    <AppThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </AppThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
