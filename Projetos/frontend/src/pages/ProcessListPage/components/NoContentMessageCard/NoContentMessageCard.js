import { Button, Card, CardContent, Divider, Grid, Typography } from '@material-ui/core';

export const NoContentMessageCard = () => {
  return (
    <Card style={{ width: '100%', height: '50%' }}>
      <CardContent>
        <Typography component="h1" align="center" style={{ fontSize: 'x-large' }}>
          <strong>Nenhum processo foi encontrado!</strong>
        </Typography>
        <Divider variant="middle" style={{ margin: '16px' }} />
        <Typography component="h6" align="center">
          Tente buscar por outro filtro.
        </Typography>
      </CardContent>
    </Card>
  );
};
