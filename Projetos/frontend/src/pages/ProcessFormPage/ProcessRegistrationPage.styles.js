import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    width: '100%',
    marginTop: 20,
    fontSize: 'XX-large',
    color: '#878788',
  },
  container: {
    width: '100%',
    minHeight: 700,
    marginBottom: 32,
    paddingBottom: 25,
  },
  form: {
    width: "95%",
  },
  thirdInput: {
    width: '30%',
  },
  halfInput: {
    width: '47.5%',
  },
  divider: {
    width: '100%',
    marginTop: 15,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 'X-large',
    color: '#878788',
  },
  button:{
      color: "white",
      backgroundColor: theme.palette.success
  }
}));
