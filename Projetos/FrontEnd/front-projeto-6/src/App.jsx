import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { ThemeProvider } from "theme";
import { KeycloakProvider } from "keycloak";
import { Header } from "components";
import { useState } from "react";
import { ProcessForm } from "components";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <Router>
      <Switch>
        <ThemeProvider>
          {/* keycloak things */}
          <Route path="silent-check-sso">
            {parent.postMessage(location.href, location.origin)}
          </Route>
          <Route path="/state=*">
            <Redirect to="" />
          </Route>

          {/* the KeycloakProvider must be inside the Router,
	      otherwise the ~keycloak things~ won't work.      */}
          <KeycloakProvider>
            <Route>
              <Header />
              teste
              <ProcessForm open={open} setOpen={setOpen} />
              <button onClick={() => setOpen((a) => !a)}>abre</button>
            </Route>
          </KeycloakProvider>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
