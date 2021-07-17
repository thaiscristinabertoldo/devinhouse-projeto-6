import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: 7.5,
    marginRight: 11,
    marginLeft: 11,
  },
  divider: {
    marginTop: 0,
    marginBottom: 7.5,
  },
  pos: {
    marginBottom: 10,
    marginRight: 5,
    marginLeft: 30,
    marginRight: 11,
  },
  action: {
    backgroundColor: '#aaaaaaaa',
  },
  button: {
    width: 35,
    height: 30,
  },
}));
