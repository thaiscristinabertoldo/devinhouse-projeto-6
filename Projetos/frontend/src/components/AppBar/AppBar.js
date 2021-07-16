import { AppBar as MuiAppBar, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import LightThemeIcon from '@material-ui/icons/Brightness7';

import { useState } from 'react';
import { style } from './AppBar.style';
import { useAppTheme } from '../../contexts/theme-context';
import { useAuth } from '../../contexts/auth-context';

const useStyle = makeStyles(style);

export const AppBar = () => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);

  const { onToggleTheme, darkMode } = useAppTheme();
  const { isLoggedIn } = useAuth();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MuiAppBar className={classes.root}>
      <Toolbar>
        <Typography variant='h6' color='textPrimary' className={classes.title}>Processos</Typography>
        <IconButton
          aria-label='change theme'
          aria-controls='theme-toggler'
          onClick={onToggleTheme}
        >
          {darkMode ? <LightThemeIcon /> : <DarkThemeIcon />}
        </IconButton>
        <IconButton
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleOpenMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id='menu-appbar'
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
          {!isLoggedIn ?
            (
              <MenuItem onClick={handleClose}>Login</MenuItem>
            )
            :
            (
              <>
                <MenuItem onClick={handleClose}>Meu cadastro</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </>
            )
          }
        </Menu>
      </Toolbar>
    </MuiAppBar>
  );
};
