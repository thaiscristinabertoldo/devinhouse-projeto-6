import { Box, Container, makeStyles } from '@material-ui/core';
import { AppBar } from '../../components/AppBar';
import { useAppTheme } from '../../contexts/theme-context';
import { useAuth } from '../../contexts/auth-context';
import { ScrollToTopButton } from '../../components/ScrollToTopButton/ScrollToTopButton';
import clsx from 'clsx';

import { useState } from 'react';

export const BaseLayout = ({ children }) => {
  const { onToggleTheme, darkMode } = useAppTheme();
  const { logout, userInformation } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: 0,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
  }));

  const classes = useStyles();

  return (
    <Box
      marginTop={3}
      paddingBottom={2}
      className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen,
      })}
    >
      <Container>
        <AppBar
          onToggleTheme={onToggleTheme}
          isDarkMode={darkMode}
          userName={userInformation.name}
          onLogout={logout}
          drawerOpen={drawerOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
      </Container>
      <Container drawerOpen={drawerOpen}>
        {children}
      </Container>
      <ScrollToTopButton />
    </Box>
  );
};
