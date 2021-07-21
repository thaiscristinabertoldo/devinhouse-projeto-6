import { AppBar, Button, IconButton, Tooltip, Toolbar, Typography, useTheme } from '@material-ui/core'
import { useStyles } from './Navbar.styles'
import MenuIcon from '@material-ui/icons/Menu'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7Icon from '@material-ui/icons/Brightness7'

export const Navbar = ({ toggleTheme }) => {
  const classes = useStyles()

  const { palette } = useTheme()

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tribunal de Justiça
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
