import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  title: {
    width: '95%',
    marginBottom: 7.5,
  },
  divider: {
    width: '95%',
    marginTop: 0,
    marginBottom: theme.spacing(2.7),
  },
  pos: {
    width: '95%',
    marginBottom: 10,
    marginRight: 5,
  },
  action: {
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
  button: {
    width: 35,
    height: 30,
  },
}));
