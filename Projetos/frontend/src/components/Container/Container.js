import MuiContainer from '@material-ui/core/Container';

export const Container = ({ children, ...rest }) => (
  <MuiContainer data-testid="custom-container" maxWidth="xl" {...rest}>
    {children}
  </MuiContainer>
);
