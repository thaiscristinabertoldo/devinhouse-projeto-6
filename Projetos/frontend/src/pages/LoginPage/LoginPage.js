import { BaseLayout } from '../../layouts/BaseLayout';
import { Box, Button, Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { Pre } from '../../components/Pre/Pre';
import { useKeycloak } from '@react-keycloak/web';
import { useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { saveIntoStorage } from '../../services/storage/local-storage-service';
import { QUERY } from '../../services/constants';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const LoginPage = () => {
  const { keycloak, initialized } = useKeycloak();

  const onClickLogin = useCallback(() => {
    keycloak.login();
  }, [keycloak]);

  if (initialized) {
    if (keycloak.authenticated) {
      return <Redirect to="/processos" />;
    }
  } else {
    return (
      <Box minHeight="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
        <Container component={Paper} elevation={3} maxWidth="sm">
          <Box padding={4}>
            <Grid container justifyContent="center">
              <LoadingSpinner />
            </Grid>
            <Grid container justifyContent="center">
              <Typography component="h1">Carregando...</Typography>
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box minHeight="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
      <Container component={Paper} elevation={3} maxWidth="sm">
        <Box padding={2}>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>
          <Divider variant="fullWidth" />
          <Box marginY={2}>
            <Typography variant="h6" gutterBottom>
              Seja bem vindo!
            </Typography>
            <Typography variant="body1" component="span">
              Para acessar, utilize as credenciais usuário <Pre>alberto</Pre> e senha <Pre>123</Pre>{' '}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button onClick={onClickLogin} size="large" variant="contained" color="primary" style={{ color: 'white' }}>
              <strong>Fazer Login</strong>
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
