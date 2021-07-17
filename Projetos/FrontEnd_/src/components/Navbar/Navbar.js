import { useState } from "react";

import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import Brightness4 from "@material-ui/icons/Brightness4";
import Brightness7 from "@material-ui/icons/Brightness7";

import { useStyles } from "./Navbar.styles";
import { MenuContainer } from "./fragments/MenuContainer/MenuContainer";

import { useCustomTheme } from "../../contexts";

import { useKeycloak } from "@react-keycloak/web";

export const NavBar = () => {
  const classes = useStyles();
  const { onToggleTheme } = useCustomTheme();
  const { palette } = useTheme();

  const { keycloak } = useKeycloak();
  const userName = keycloak?.tokenParsed?.preferred_username;

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>

          <MenuContainer
            open={menuOpen}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
          />

          <Typography variant="h6" className={classes.title}>
            DEVinHouse
          </Typography>

          <Typography variant="body2" className={classes.title}>
            Olá {userName}!
          </Typography>

          <Tooltip title="Add" aria-label="add">
            <IconButton
              aria-label="Alternar tema claro/escuro"
              onClick={onToggleTheme}
            >
              {palette?.type === "dark" ? (
                <Brightness7 className={classes.iconColor} />
              ) : (
                <Brightness4 className={classes.iconColor} />
              )}
            </IconButton>
          </Tooltip>

          {!!keycloak?.authenticated && (
            <Button color="inherit" onClick={() => keycloak.logout()}>
              SAIR
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
