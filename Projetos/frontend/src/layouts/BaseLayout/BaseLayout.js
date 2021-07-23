import { Box, Container } from '@material-ui/core';
import { AppBar } from '../../components/AppBar';

export const BaseLayout = ({ children }) => {
  return (
    <Box marginTop={3}>
      <AppBar />
      <Container>{children}</Container>
    </Box>
  );
};
