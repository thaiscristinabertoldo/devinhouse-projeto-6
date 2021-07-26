import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './LoadingSpinner.styles';

export const LoadingSpinner = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress variant="determinate" className={classes.bottom} size={80} thickness={6} value={100} />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={80}
        thickness={6}
      />
    </div>
  );
};
