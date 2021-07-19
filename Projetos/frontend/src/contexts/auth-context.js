import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  const { keycloak } = useKeycloak();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(keycloak?.authenticated));
    console.log(keycloak?.authenticated);
    console.log(isLoggedIn);
  }, [keycloak?.authenticated]);

  const logout = useCallback(() => {
    return keycloak?.logout();
  }, [keycloak]);

  return <AuthContext.Provider value={{ isLoggedIn, logout }}>{children}</AuthContext.Provider>;
};
