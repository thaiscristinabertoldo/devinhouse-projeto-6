import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.palette.primary.main,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: theme.palette.primary.main,
  },
  closeIcon: {
    color: 'white',
  },
  optionIcon: {
    color: theme.palette.primary.main,
  },
  backOption: {
    color: theme.palette.primary.main,
  },
  backOptionIcon: {
    color: theme.palette.primary.main,
  },
}));
