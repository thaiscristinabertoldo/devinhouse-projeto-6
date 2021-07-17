import { BaseLayout } from '../../layouts/BaseLayout';
import { Box, Container, Paper, Typography } from '@material-ui/core';
import { TextInput } from '../../components/TextInput';
import { Pre } from '../../components/Pre/Pre';

export const LoginPage = () => {

  return (
    <BaseLayout>
      <Box minHeight='100%' width='100%' display='flex' justifyContent='center' alignItems='center'>
        <Container component={Paper} elevation={0} maxWidth='sm'>
          <Box padding={2}>
            <Typography variant='h4'>Login</Typography>
            <Typography variant='body1'>Seja bem vindo! Para acesasr, utilize as credenciais <Pre>usuario</Pre> e senha <Pre>senha</Pre> </Typography>
            <Box marginY={3}>
              <TextInput label='Usuário' placeholder='Digite seu usuário' />
              <TextInput label='Senha' placeholder='Digite sua senha' type='password' />
            </Box>
          </Box>
        </Container>
      </Box>

    </BaseLayout>
  );
};
