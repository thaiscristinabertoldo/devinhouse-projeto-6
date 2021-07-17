import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';
import { ListProcessPage } from '../pages/ListProcessPage';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <Route path='/processos' component={ListProcessPage} />
      </Switch>
    </BrowserRouter>
  );
};
