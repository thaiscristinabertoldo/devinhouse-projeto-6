import MuiGrid from '@material-ui/core/Grid';

export const Grid = ({ children, ...rest }) => (
  <MuiGrid data-testid="custom-grid" {...rest}>
    {children}
  </MuiGrid>
);

export const GridItem = ({ children, ...rest }) => (
  <MuiGrid data-testid="custom-grid-item" xs={12} {...rest} item={true}>
    {children}
  </MuiGrid>
);
