import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';
import { ListProcessPage } from '../pages/ListProcessPage';
import { ProcessFormPage } from '../pages/ProcessFormPage';
import { PrivateRoute } from './components/PrivateRoute';
import { UserInformationPage } from '../pages/UserInformationPage';
import { useKeycloak } from '@react-keycloak/web';

export const Routes = () => {
  const { keycloak, initialized } = useKeycloak();
  const isAuthenticated = keycloak.authenticated;

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <PrivateRoute isAuthenticated={isAuthenticated} path="/processos" exact component={ListProcessPage} />
        <PrivateRoute isAuthenticated={isAuthenticated} path="/processos/formulario/:id?" component={ProcessFormPage} />
        <PrivateRoute isAuthenticated={isAuthenticated} path="/user" component={UserInformationPage} />
        <Redirect path="/" exact to={initialized ? '/processos' : '/login'} />
      </Switch>
    </BrowserRouter>
  );
};
