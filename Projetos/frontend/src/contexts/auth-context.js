import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { removeFromStorage } from '../services/storage/local-storage-service';
import { QUERY } from '../services/constants';

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

  const [userInformation, setUserInformation] = useState();

  useEffect(() => {
    if (keycloak.authenticated) {
      setUserInformation(keycloak.tokenParsed.name);
      keycloak.loadUserInfo().then((userInfo) => {
        setUserInformation(userInfo);
      });
    }
  }, [keycloak?.authenticated]);

  const logout = useCallback(() => {
    removeFromStorage(QUERY.TOKEN);
    return keycloak?.logout();
  }, [keycloak]);

  return <AuthContext.Provider value={{ logout, userInformation }}>{children}</AuthContext.Provider>;
};
