import { Box, Card, CardActions, CardContent, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from './ProcessCard.styles';

export const ProcessCard = ({ processData, onDelete, onEdit }) => {
  const {
    id: idProcesso = '',
    nuProcesso = '',
    sgOrgaoSetor = '',
    nuAno = '',
    chaveProcesso = '',
    descricao = '',
    cdAssunto = '',
    cdInteressado = '',
  } = processData;

  const classes = useStyles();

  return (
    <Card style={{ marginBottom: '16px' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" component="h2">
            {chaveProcesso}
          </Typography>
          <Typography color="textPrimary">
            <strong>Nº:</strong> {nuProcesso.toString().padStart(4, '0')}
          </Typography>
        </Box>
        <Divider style={{ margin: '16px 0' }} />
        <Typography color="textPrimary">
          <strong>Órgão/Setor:</strong> {sgOrgaoSetor}
        </Typography>
        <Typography color="textPrimary">
          <strong>Ano:</strong> {nuAno}
        </Typography>
        <Typography color="textPrimary">
          <strong>Interessado:</strong> {cdInteressado.nmInteressado}
        </Typography>
        <Typography color="textPrimary">
          <strong>Assunto:</strong> {cdAssunto.descricao}
        </Typography>
        <Typography color="textPrimary">
          <strong>Descrição:</strong> {descricao}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Grid container justifyContent="flex-end">
          <Box color={'#FFF'} marginX={1}>
            <IconButton onClick={() => onDelete(idProcesso)} size="small">
              <DeleteForeverIcon className={classes.icons} />
            </IconButton>
          </Box>
          <Box marginX={1}>
            <IconButton size="small" onClick={() => onEdit(idProcesso)}>
              <EditIcon className={classes.icons} />
            </IconButton>
          </Box>
        </Grid>
      </CardActions>
    </Card>
  );
};
