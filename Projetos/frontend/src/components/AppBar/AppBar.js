import { AppBar as MuiAppBar, Toolbar, Typography } from '@material-ui/core';

export const AppBar = () => {
  return (
    <MuiAppBar>
      <Toolbar>
        <Typography variant="h6">Processos</Typography>
      </Toolbar>
    </MuiAppBar>
  );
};
