import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'

import { ListItemIcon, Menu, MenuItem, Typography } from '@material-ui/core'
import { Home as HomeIcon } from '@material-ui/icons'

export const MenuContainer = ({ anchorEl, open, onClose }) => {
  const history = useHistory()

  const handleClick = (path) => {
    onClose()
    history.push(path)
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            width: '24ch',
          },
        }}
      >
        <MenuItem onClick={() => handleClick('/home')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Typography variant="inherit">Home</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

MenuContainer.propTypes = {
  anchorEl: PropTypes.any,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
