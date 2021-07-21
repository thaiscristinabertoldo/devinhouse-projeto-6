import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { ThemeProvider } from "theme";
import { KeycloakProvider } from "keycloak";
import { Header } from "components";

function App() {
  return (
    <Router>
      <Switch>
        {/* keycloak things */}
        <Route path="silent-check-sso">
          {parent.postMessage(location.href, location.origin)}
        </Route>
        <Route path="/state=*">
          <Redirect to="" />
        </Route>

        <ThemeProvider>
          {/* the KeycloakProvider must be inside the Router,
	      otherwise the ~keycloak things~ won't work.      */}
          <KeycloakProvider>
            <Route>
              <Header />
              teste
            </Route>
          </KeycloakProvider>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
