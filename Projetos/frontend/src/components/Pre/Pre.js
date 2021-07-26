import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  preStyle: {
    display: 'inline',
    padding: '2px 6px',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
  },
}));

export const Pre = ({ children: text }) => {
  const classes = useStyles();
  return (
    <pre data-testid="custom-pre" className={classes.preStyle}>
      {text}
    </pre>
  );
};
