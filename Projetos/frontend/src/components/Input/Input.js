import { TextField } from '@material-ui/core';
import { useStyles } from './Input.styles';

export const Input = (props) => {
  const classes = useStyles();
  return <TextField variant="outlined" inputProps={{ autoComplete: 'off' }} {...props} className={classes.input} />;
};
