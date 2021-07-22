import { useCallback } from 'react'
import { AppBar, Button, IconButton, Tooltip, Toolbar, Typography, useTheme } from '@material-ui/core'
import { useStyles } from './Navbar.styles'
import MenuIcon from '@material-ui/icons/Menu'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'

import { useKeycloak } from '@react-keycloak/web'

export const Navbar = ({ toggleTheme }) => {
  const classes = useStyles()

  const auth = useKeycloak()
  console.log('teste', auth)
  const user = auth?.keycloak.tokenParsed?.name

  const logout = useCallback(() => {
    auth?.keycloak?.logout()
  }, [auth])

  const { palette } = useTheme()

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Olá, {user}
          </Typography>
          <Tooltip title="Alterar tema">
            <IconButton aria-label="delete" onClick={toggleTheme}>
              {palette?.type === 'dark' ? (
                <Brightness4Icon className={classes.iconColor} />
              ) : (
                <Brightness7Icon className={classes.iconColor} />
              )}
            </IconButton>
          </Tooltip>
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
