import { useSnackbar } from 'notistack'
import { IconButton } from '@material-ui/core'
import { Close as IconClose } from '@material-ui/icons'

import { useStyles } from './SnackbarCloseButton.styles'
export const SnackbarCloseButton = ({ key }) => {
  const { closeSnackbar } = useSnackbar()
  const classes = useStyles()

  return (
    <IconButton onClick={() => closeSnackbar(key)}>
      <IconClose className={classes.iconColor} />
    </IconButton>
  )
}
