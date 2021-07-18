import { useTheme } from "@emotion/react";
import { Typography, useMediaQuery } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DarkModeIcon from "@material-ui/icons/DarkMode";
import LightModeIcon from "@material-ui/icons/LightMode";
import { HeaderMenu } from "components/HeaderMenu";
import { useThemes } from "context/theme";
import { StyledHeader, Field, Spacing } from "./Header.styled";

export const Header = () => {
  const { darkMode, ToggleTheme } = useThemes();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <StyledHeader>
        <Field>
          <AccountBalanceIcon style={{ marginRight: "8px" }} />
          <Typography>{!isLargeScreen && "Jboys - Consultoria"}</Typography>
        </Field>
        <Field>
          <HeaderMenu title={darkMode ? "LIGHT" : "DARK"} onClick={ToggleTheme}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </HeaderMenu>
          <HeaderMenu title="CONECTAR" onClick={null}>
            <AccountCircleIcon />
          </HeaderMenu>
        </Field>
      </StyledHeader>
      <Spacing />
    </>
  );
};
