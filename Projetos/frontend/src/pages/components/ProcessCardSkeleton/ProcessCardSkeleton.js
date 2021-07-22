import { Button, Card, CardActions, Divider, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useStyles } from './ProcessCardContainerSkeleton.styles';

export const ProcessCardSkeleton = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container justifyContent="center">
        <Skeleton variant="text" component="h1" animation="wave" className={classes.title} />
      </Grid>
      <Grid container justifyContent="center">
        <Divider className={classes.divider} />
      </Grid>
      <Grid container justifyContent="center">
        <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
        <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
        <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
        <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
      </Grid>
      <Grid container justifyContent="flex-end" className={classes.action}>
        <CardActions>
          <Button size="small">
            <Skeleton variant="text" component="div" animation="wave" className={classes.button} />
          </Button>
          <Button size="small" color="primary">
            <Skeleton variant="text" component="div" animation="wave" className={classes.button} />
          </Button>
        </CardActions>
      </Grid>
    </Card>
  );
};
