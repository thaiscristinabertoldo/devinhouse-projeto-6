import MuiGrid from '@material-ui/core/Grid';

export const Grid = ({ children, ...rest }) => <MuiGrid {...rest}>{children}</MuiGrid>;

export const GridItem = ({ children, ...rest }) => (
  <MuiGrid xs={12} {...rest} item={true}>
    {children}
  </MuiGrid>
);
