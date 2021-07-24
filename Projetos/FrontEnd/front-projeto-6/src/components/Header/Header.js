import { useContext } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Button, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Login, Logout, DarkMode, LightMode } from "@material-ui/icons";
import { ThemeContext } from "theme";
import * as Styled from "./Header.styled";
import { SELF_URI } from "env";

export const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();
  const { keycloak } = useKeycloak();

  return (
    <>
      <Styled.AppBar>
        <Typography>
          {keycloak.authenticated
            ? `Bem-vindo, ${keycloak.idTokenParsed.preferred_username}`
            : "Jboys - Consultoria"}
        </Typography>
        <Styled.Box>
          <Styled.IconButton onClick={toggleTheme}>
            {theme?.palette?.mode === "dark" ? <DarkMode /> : <LightMode />}
          </Styled.IconButton>

          {keycloak.authenticated ? (
            <Button onClick={() => keycloak.logout({ redirectUri: SELF_URI })}>
              <Typography color="white">Sair</Typography>
            </Button>
          ) : (
            <Button onClick={() => keycloak.login({ redirectUri: SELF_URI })}>
              <Typography color="white">Entrar</Typography>
            </Button>
          )}
        </Styled.Box>
      </Styled.AppBar>

      <Styled.Spacing />
    </>
  );
};
