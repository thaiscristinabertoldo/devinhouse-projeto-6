import { BaseLayout } from '../../layouts/BaseLayout';
import { Box, Container, Paper } from '@material-ui/core';

export const LoginPage = () => {
  return <BaseLayout>
    <Box minHeight="100%" width="100%" display="flex" justifyContent="center" alignItems="center">
      <Container component={Paper} elevation={0} maxWidth='sm'>
        Login Page
      </Container>
    </Box>

  </BaseLayout>;
};
