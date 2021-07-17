import { Button, Card, CardActions, CardContent, Divider, Grid, Typography } from '@material-ui/core';
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
    subjectDescriptionStatus,
    processStakeholders,
    processDescription,
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
        <Typography className={classes.pos} color="textPrimary">
          <strong>Número do Processo:</strong> {processNumber}
        </Typography>
        <Typography className={classes.pos} color="textPrimary">
          <strong>Órgão/Setor:</strong> {processOrgan}
        </Typography>
        <Grid container direction="row">
          <Typography className={classes.pos} color="textPrimary">
            <strong>Assunto:</strong>
          </Typography>
          <Typography className={subjectDescriptionStatus?.toLowerCase() === 's' ? classes.active : classes.noActive}>
            {processSubject}
          </Typography>
        </Grid>
        <Typography className={classes.pos} color="textPrimary">
          <strong>Interessado:</strong> {processStakeholders}
        </Typography>
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
            <EditIcon className={classes.editButton} />
          </Button>
        </CardActions>
      </Grid>
    </Card>
  );
};
