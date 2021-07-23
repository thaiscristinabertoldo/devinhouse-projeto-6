import { Button, Card, CardContent, Divider, Grid, Typography } from '@material-ui/core';

export const NoContentMessageCard = () => {
  return (
    <Card style={{ width: '100%', height: '50%' }}>
      <CardContent>
        <Grid direction="column" justifyContent="center" style={{ width: '100%' }}>
          <Typography component="h1" align="center" style={{ fontSize: 'x-large' }}>
            <strong>Nenhum processo foi encontrado!</strong>
          </Typography>
          <br />
          <Divider />
          <br />
          <Typography component="h6" align="center">
            Tente buscar por outro filtro ou<br/>
            <Button color="primary" onClick={() => document.location.reload(true)}>
              Clique aqui para voltar para a tela anterior!
            </Button>
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};
