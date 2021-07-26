import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { CircularProgress, Box } from "@material-ui/core";
import { SELF_URI } from "env";

const keycloak = new Keycloak({
  url: "https://training.dev.delivery/auth/",
  realm: "grupo4",
  clientId: "projeto6",
});

const KeycloakProvider = ({ children }) => {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: SELF_URI + "/#/silent-check-sso",
      }}
      LoadingComponent={
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      {children}
    </ReactKeycloakProvider>
  );
};

export { KeycloakProvider };
