import { Box } from '@material-ui/core';

export const Section = ({ children, ...rest }) => (
  <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" marginY={2} {...rest}>
    {children}
  </Box>
);
