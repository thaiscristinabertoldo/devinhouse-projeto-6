import { AppBar } from '../../components/AppBar';
import { Box, Container } from '@material-ui/core';
import { useAuth } from '../../contexts/auth-context';

export const BaseLayout = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Box>
      {isLoggedIn && <AppBar />}
      <Container style={{ marginTop: isLoggedIn ? 85 : "15%" }}>{children}</Container>
    </Box>
  );
};
