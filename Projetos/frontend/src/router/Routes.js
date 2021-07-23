import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';
import { ListProcessPage } from '../pages/ListProcessPage';
import { ProcessFormPage } from '../pages/ProcessFormPage';
import { PrivateRoute as PR } from './components/PrivateRoute';
import { UserInformationPage } from '../pages/UserInformationPage';
import { useKeycloak } from '@react-keycloak/web';

export const Routes = () => {
  const { keycloak } = useKeycloak();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <PR isAuthenticated={keycloak.authenticated} path="/processos" exact component={ListProcessPage} />
        <PR isAuthenticated={keycloak.authenticated} path="/processos/formulario/:id?" component={ProcessFormPage} />
        <PR isAuthenticated={keycloak.authenticated} path="/user" component={UserInformationPage} />
        <Redirect exact to={'/processos'} />
      </Switch>
    </BrowserRouter>
  );
};
