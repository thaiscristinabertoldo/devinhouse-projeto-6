import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: 7.5,
  },
  divider: {
    marginTop: 0,
    marginBottom: 7.5,
  },
  pos: {
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 20,
  },
  action: {
    backgroundColor: '#aaaaaaaa',
  },
  noActive: {
    color: '#aaaaaa',
    textDecoration: 'line-through',
  },
  editButton: {
    color: '#5e17eb',
  },
  deleteButton: {
    color: '#38b6ff',
  },
}));
