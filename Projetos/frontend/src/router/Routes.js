import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import { ROUTER_URLS } from './constants';
import { PrivateRoute } from './components/PrivateRoute';

import { LoginPage } from '../pages/LoginPage';
import { ProcessListPage } from '../pages/ProcessListPage';
import { ProcessFormPage } from '../pages/ProcessFormPage';

export const Routes = () => {
  const { keycloak } = useKeycloak();

  return (
    <Router>
      <Switch>
        <Route path={ROUTER_URLS.LOGIN} exact component={LoginPage} />
        <PrivateRoute auth={keycloak.authenticated} path={ROUTER_URLS.PROCESSOS} exact component={ProcessListPage} />
        <PrivateRoute auth={keycloak.authenticated} path={ROUTER_URLS.PROCESSOS_FORM_ID} component={ProcessFormPage} />
        <Redirect exact to={ROUTER_URLS.PROCESSOS} />
      </Switch>
    </Router>
  );
};
