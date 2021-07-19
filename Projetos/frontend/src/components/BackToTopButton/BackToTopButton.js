import { makeStyles, useScrollTrigger, Zoom } from '@material-ui/core';
import { useStyles } from './BackToTopButton.styles';

export const ScrollTop = (props) => {
  const { children, window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
    console.log(anchor);
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={scrollToTop} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
};
