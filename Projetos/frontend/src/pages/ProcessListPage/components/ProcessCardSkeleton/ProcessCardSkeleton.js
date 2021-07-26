import { Box, Card, CardActions, CardContent, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export const ProcessCardSkeleton = () => {
  return (
    <Card style={{ marginBottom: '16px', minWidth: '32%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" component="h2">
            <Skeleton width={80} variant="text" animation="wave" />
          </Typography>
          <Typography color="textPrimary">
            <Skeleton width={40} variant="text" animation="wave" />
          </Typography>
        </Box>
        <Divider style={{ margin: '16px 0' }} />
        <Typography color="textPrimary">
          <Skeleton variant="text" animation="wave" />
        </Typography>
        <Typography color="textPrimary">
          <Skeleton variant="text" animation="wave" />
        </Typography>
        <Typography color="textPrimary">
          <Skeleton variant="text" animation="wave" />
        </Typography>
        <Typography color="textPrimary">
          <Skeleton variant="text" animation="wave" />
        </Typography>
        <Typography color="textPrimary">
          <Skeleton variant="text" animation="wave" />
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container justifyContent="flex-end">
          <Box color={'#FFF'} marginX={1}>
            <IconButton color="default" size="small">
              <Skeleton width={26} height={26} variant="circle" animation="wave" />
            </IconButton>
          </Box>
          <Box marginX={1}>
            <IconButton color="default" size="small">
              <Skeleton width={26} height={26} variant="circle" animation="wave" />
            </IconButton>
          </Box>
        </Grid>
      </CardActions>
    </Card>
  );

  // return (
  //   <Card className={classes.root}>
  //     <Grid container justifyContent="center">
  //       <Skeleton variant="text" component="h1" animation="wave" className={classes.title} />
  //     </Grid>
  //     <Grid container justifyContent="center">
  //       <Divider className={classes.divider} />
  //     </Grid>
  //     <Grid container justifyContent="center">
  //       <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
  //       <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
  //       <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
  //       <Skeleton variant="text" component="h2" animation="wave" className={classes.pos} />
  //     </Grid>
  //     <Grid container justifyContent="flex-end" className={classes.action}>
  //       <CardActions>
  //         <Button size="small">
  //           <Skeleton variant="text" component="div" animation="wave" className={classes.button} />
  //         </Button>
  //         <Button size="small" color="primary">
  //           <Skeleton variant="text" component="div" animation="wave" className={classes.button} />
  //         </Button>
  //       </CardActions>
  //     </Grid>
  //   </Card>
  // );
};
