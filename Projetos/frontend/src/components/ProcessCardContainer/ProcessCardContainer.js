import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { useStyles } from './ProcessCardContainer.styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const ProcessCardContainer = (props) => {
  const { processTitle, processNumber, processOrgan, descriptionStatus, processStakeholders, processDescription } =
    props;
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={() => console.log('oi')}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {processTitle}
        </Typography>
        <Typography className={classes.pos} color="textPrimary">
          Número do Processo: {processNumber}
        </Typography>
        <Typography className={classes.pos} color="textPrimary">
          Órgão/Setor: {processOrgan}
        </Typography>
        <Grid container direction="row" justifyContent="space-between">
          <Typography className={classes.pos} color="textPrimary">
            Descrição: {processDescription}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Ativa: {descriptionStatus}
          </Typography>
        </Grid>
        <Typography className={classes.pos} color="textPrimary">
          Interessados:
        </Typography>
        <Grid container direction="row" justifyContent="space-between">
          {
            /*processStakeholders?.map((element, index) => ( */
            <Typography className={classes.pos} color="textSecondary">
              {processStakeholders}
            </Typography>
            /* ))*/
          }
        </Grid>
        <Typography variant="body2" component="p" color="textSecondary">
          {processDescription}
        </Typography>
      </CardContent>
      <Grid container justifyContent="flex-end">
        <CardActions>
          <Button size="small">
            <DeleteForeverIcon color="secondary" />
          </Button>
          <Button size="small" color="primary">
            <EditIcon />
          </Button>
        </CardActions>
      </Grid>
    </Card>
  );
};
