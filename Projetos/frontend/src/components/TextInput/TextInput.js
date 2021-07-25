import { TextField } from '@material-ui/core';

export const TextInput = (props) => {
  return <TextField variant="outlined" fullWidth inputProps={{ autoComplete: 'off' }} {...props} />;
};
