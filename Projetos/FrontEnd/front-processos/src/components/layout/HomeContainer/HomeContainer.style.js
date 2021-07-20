import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(18),
    paddingLeft: theme.spacing(18),
    paddingRight: theme.spacing(18)
  },
  container: {
    marginTop: theme.spacing(8)
  }
}))
