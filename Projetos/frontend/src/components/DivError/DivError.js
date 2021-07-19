import { Typography } from '@material-ui/core';

export const DivError = ({ children }) => {
  return (
    <div>
      <Typography variant="caption" color="error">
        {children}
      </Typography>
    </div>
  );
};
