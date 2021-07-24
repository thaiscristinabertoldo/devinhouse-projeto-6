import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';
import { ProcessListPage } from '../pages/ListProcessPage';
import { ProcessFormPage } from '../pages/ProcessFormPage';
import { PrivateRoute } from './components/PrivateRoute';
import { UserInformationPage } from '../pages/UserInformationPage';
import { useKeycloak } from '@react-keycloak/web';

export const Routes = () => {
  const { keycloak } = useKeycloak();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <PrivateRoute isAuthenticated={keycloak.authenticated} path="/processos" exact component={ProcessListPage} />
        <PrivateRoute
          isAuthenticated={keycloak.authenticated}
          path="/processos/formulario/:id?"
          component={ProcessFormPage}
        />
        <PrivateRoute isAuthenticated={keycloak.authenticated} path="/user" component={UserInformationPage} />
        <Redirect exact to={'/processos'} />
      </Switch>
    </BrowserRouter>
  );
};
