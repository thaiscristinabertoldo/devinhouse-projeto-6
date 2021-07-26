import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { ThemeProvider } from "theme";
import { KeycloakProvider } from "keycloak";
import { Header, ProcessesList } from "components";
import { useState } from "react";

function App() {
  const [processes, setProcesses] = useState();
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
              <ProcessesList
                processes={processes}
                setProcesses={setProcesses}
              />
            </Route>
          </KeycloakProvider>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
