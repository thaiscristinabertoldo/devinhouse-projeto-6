import { TextField } from '@material-ui/core';
import { useStyles } from './Input.styles';

export const Input = (props) => {
  const { label, defaultValue, disabled,multiline } = props;
  const classes = useStyles();
  return (
    <TextField label={label} variant="filled" defaultValue={defaultValue} disabled={disabled} multiline={multiline} className={classes.input} />
  );
};
