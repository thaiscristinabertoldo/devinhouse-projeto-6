import {
  AppBar as MuiAppBar,
  Divider,
  Grid,
  IconButton,
  ListSubheader,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import LightThemeIcon from '@material-ui/icons/Brightness7';

import { useState } from 'react';
import { style } from './AppBar.style';

const useStyle = makeStyles(style);

export const AppBar = ({ onToggleTheme, isDarkMode, userName, onLogout }) => {
  const classes = useStyle();

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MuiAppBar className={classes.root}>
        <Toolbar>
          <Typography variant="h6" style={{ color: 'white' }} className={classes.title}>
            Processos
          </Typography>
          <IconButton onClick={onToggleTheme}>
            {isDarkMode ? <LightThemeIcon style={{ color: 'white' }} /> : <DarkThemeIcon style={{ color: 'white' }} />}
          </IconButton>
          <IconButton onClick={handleOpen}>
            <AccountCircle style={{ color: 'white' }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <ListSubheader>
              <Typography>Olá, {userName}.</Typography>
            </ListSubheader>
            <Divider variant="middle" style={{ margin: '8px' }} />
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </MuiAppBar>
      <Toolbar />

      <Grid id="back-to-top-anchor" />
    </>
  );
};
