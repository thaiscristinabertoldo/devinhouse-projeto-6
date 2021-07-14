import { Typography } from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DarkModeIcon from "@material-ui/icons/DarkMode";
import LightModeIcon from "@material-ui/icons/LightMode";
import { HeaderMenu } from "components/HeaderMenu";
import { LoginMenu } from "components/LoginMenu";
import { useThemes } from "context/theme";
import { StyledHeader, Field } from "./Header.styled";

export const HeaderLarge = () => {
  const { darkMode, ToggleTheme } = useThemes();

  return (
    <>
      <StyledHeader>
        <Field>
          <AccountBalanceIcon style={{ marginRight: "8px" }} />
          <Typography>Jboys - Consultoria</Typography>
        </Field>
        <Field>
          <HeaderMenu title={darkMode ? "LIGHT" : "DARK"} onClick={ToggleTheme}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </HeaderMenu>
          {false ? (
            <LoginMenu />
          ) : (
            <HeaderMenu title="LOG IN" onClick={null}>
              <AccountCircleIcon />
            </HeaderMenu>
          )}
        </Field>
      </StyledHeader>
    </>
  );
};
