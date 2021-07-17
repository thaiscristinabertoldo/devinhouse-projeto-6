import { AppBar } from '../../components/AppBar';
import { Box, Container } from '@material-ui/core';

export const BaseLayout = ({ children }) => {
  return (
    <Box>
      <AppBar />
      <Container style={{marginTop: 85}}>{children}</Container>
    </Box>
  );
};
