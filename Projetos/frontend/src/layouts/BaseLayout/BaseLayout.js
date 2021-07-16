import { AppBar } from '../../components/AppBar';
import { Box, Container } from '@material-ui/core';

export const BaseLayout = ({ children }) => {
  return (
    <Box bgcolor="red">
      <AppBar />
      <Container>{children}</Container>
    </Box>
  );
};
