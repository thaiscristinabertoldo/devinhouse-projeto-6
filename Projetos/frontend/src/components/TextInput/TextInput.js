import { Box, TextField } from '@material-ui/core';

export const TextInput = ({ label = 'Titulo do campo', ...props }) => {
  const defaultLabelProps = { shrink: true };

  return (
    <Box paddingY={2}>
      <TextField
        fullWidth
        variant='outlined'
        InputLabelProps={defaultLabelProps}
        label={label}
        {...props}
      />
    </Box>
  );
};
