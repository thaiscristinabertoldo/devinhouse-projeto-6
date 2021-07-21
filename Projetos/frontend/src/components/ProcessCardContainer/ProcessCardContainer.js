import { Button, Card, CardActions, CardContent, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { useStyles } from './ProcessCardContainer.styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export const ProcessCardContainer = (props) => {
  const {
    processTitle,
    processDate,
    processNumber,
    processOrgan,
    processSubject,
    processStakeholder,
    processDescription,
    handleEditProcess,
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container justifyContent="space-between">
          <Typography variant="h5" component="h2" className={classes.title}>
            {processTitle}
          </Typography>
          <Typography component="h2" className={classes.date}>
            {processDate}
          </Typography>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container justifyContent="space-between">
          <Typography className={classes.pos} color="textPrimary">
            <strong>Órgão/Setor:</strong> {processOrgan}
          </Typography>
          <Typography className={classes.pos} color="textPrimary">
            <strong>Nº:</strong> {processNumber.toString().padStart(4, '0')}
          </Typography>
        </Grid>
        <Grid container direction="row">
          <Typography className={classes.pos} color="textPrimary">
            <strong>Interessado:</strong>
          </Typography>
          <Typography>{processStakeholder}</Typography>
        </Grid>
        <Grid container direction="row">
          <Typography className={classes.pos} color="textPrimary">
            <strong>Assunto:</strong>
          </Typography>
          <Typography>{processSubject}</Typography>
        </Grid>
        <Typography className={classes.pos} color="textPrimary">
          <strong>Descrição:</strong> {processDescription}
        </Typography>
      </CardContent>
      <Grid container justifyContent="flex-end" className={classes.action}>
        <CardActions>
          <Button size="small">
            <DeleteForeverIcon className={classes.deleteButton} />
          </Button>
          <Button size="small">
            <EditIcon className={classes.editButton} onClick={handleEditProcess} />
          </Button>
        </CardActions>
      </Grid>
    </Card>
  );
};
