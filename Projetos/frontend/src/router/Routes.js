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
        <PrivateRoute path="/processos" exact component={ListProcessPage} />
        <PrivateRoute path="/processos/formulario/:id?" component={ProcessRegistrationPage} />
        <Redirect path="/" exact to="/processos" />
      </Switch>
    </BrowserRouter>
  );
};
