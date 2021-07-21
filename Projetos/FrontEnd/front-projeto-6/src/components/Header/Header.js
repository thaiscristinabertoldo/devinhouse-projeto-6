import { useContext, useCallback } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Typography, IconButton } from "@material-ui/core";
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
      <Styled.Header>
        <Typography>
          {keycloak.authenticated
            ? `Bem-vindo, ${keycloak.idTokenParsed.given_name}`
            : "Jboys - Consultoria"}
        </Typography>

        <IconButton onClick={toggleTheme}>
          {theme?.palette?.mode === "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>

        {keycloak.authenticated ? (
          <IconButton
            onClick={() => keycloak.logout({ redirectUri: SELF_URI })}
          >
            <Logout />
          </IconButton>
        ) : (
          <IconButton onClick={() => keycloak.login({ redirectUri: SELF_URI })}>
            <Login />
          </IconButton>
        )}
      </Styled.Header>

      <Styled.Spacing />
    </>
  );
};
