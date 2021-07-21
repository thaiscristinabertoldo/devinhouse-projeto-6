import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  iconColor: {
    color: theme.palette.common.white,
  },
  appBar: {
    backgroundColor: theme.palette?.type === 'dark' ? theme.palette.background.paper : theme.palette.primary.main,
  },
}))
