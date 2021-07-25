import ErrorImage from '../../../../assets/illustrations/ServerDown';
import { Box, Card, createStyles, makeStyles, Typography, useTheme } from '@material-ui/core';

export const PageError = ({ errorMessage = 'Erro desconhecido.' }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box component="center" width={'100%'}>
      <Box component={Card} padding={2}>
        <Typography variant="h4" component={'strong'} color="primary">
          Erro no Servidor!!
        </Typography>
        <Typography>Mensagem: {errorMessage}</Typography>
        <ErrorImage className={classes.svg} darkColor={theme.palette.primary.dark} />
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    svg: {
      width: '100%',
      maxWidth: '480px',
      height: 'auto',
    },
  })
);
