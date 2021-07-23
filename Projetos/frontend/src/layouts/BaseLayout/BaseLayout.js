import { Box, Container } from '@material-ui/core';
import { AppBar } from '../../components/AppBar';
import { useAppTheme } from '../../contexts/theme-context';
import { useAuth } from '../../contexts/auth-context';
import { ScrollToTopButton } from '../../components/ScrollToTopButton/ScrollToTopButton';

export const BaseLayout = ({ children }) => {
  const { onToggleTheme, darkMode } = useAppTheme();
  const { logout, userInformation } = useAuth();

  return (
    <Box marginTop={3}>
      <AppBar onToggleTheme={onToggleTheme} isDarkMode={darkMode} userName={userInformation.name} onLogout={logout} />
      <Container>{children}</Container>
      <ScrollToTopButton />
    </Box>
  );
};
