import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    marginBottom: "2.5%"
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 300 : 700],
  },
  top: {
    color: theme.palette.primary.main,
    animationDuration: '600ms',
    position: 'absolute',
    left: 0,
  },
  circle: {
    strokeLinecap: 'round',
  },
}));
