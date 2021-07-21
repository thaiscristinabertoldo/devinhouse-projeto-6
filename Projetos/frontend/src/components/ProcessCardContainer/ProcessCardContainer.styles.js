import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: 7.5,
  },
  divider: {
    marginTop: 0,
    marginBottom: theme.spacing(2.7),
  },
  pos: {
    marginBottom: 10,
    marginRight: 5,
  },
  action: {
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
  noActive: {
    color: '#aaaaaa',
    textDecoration: 'line-through',
  },
  editButton: {
    color: 'white',
  },
  deleteButton: {
    color: 'white',
  },
}));
