import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';
import { ListProcessPage } from '../pages/ListProcessPage';
import { ProcessRegistrationPage } from '../pages/ProcessRegistrationPage';
import { PrivateRoute } from './components/PrivateRoute';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <PrivateRoute path="/processos" exxact component={ListProcessPage} />
        <PrivateRoute path="/processos/cadastro" component={ProcessRegistrationPage} />
        <Redirect path="/" to="/processos" />
      </Switch>
    </BrowserRouter>
  );
};
