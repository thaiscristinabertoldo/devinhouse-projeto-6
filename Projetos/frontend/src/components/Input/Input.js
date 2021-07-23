import { makeStyles, TextField } from '@material-ui/core';

export const Input = (props) => {
  const classes = useStyles();
  return <TextField variant="outlined" inputProps={{ autoComplete: 'off' }} {...props} className={classes.input} />;
};

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(1.5),
    width: '100%',
  },
}));
