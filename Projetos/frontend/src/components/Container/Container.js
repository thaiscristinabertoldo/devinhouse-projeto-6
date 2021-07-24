import MuiContainer from '@material-ui/core/Container';

export const Container = ({ children, ...rest }) => (
  <MuiContainer maxWidth="xl" {...rest}>
    {children}
  </MuiContainer>
);
