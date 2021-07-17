import { Button, Card, CardActions, Divider, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useStyles } from './ProcessCardContainerSkeleton.styles';

export const ProcessCardContainerSkeleton = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Skeleton variant="text" component="h1" animation="wave" className={classes.title} />
      <Divider className={classes.divider} />
      <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
      <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
      <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
      <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
      <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
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
