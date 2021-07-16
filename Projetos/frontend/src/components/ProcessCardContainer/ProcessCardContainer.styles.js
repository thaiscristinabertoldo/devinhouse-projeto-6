import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    cursor: 'pointer',
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: 15,
  },
  pos: {
    marginBottom: 10,
    marginRight: 5,
  },
}));
