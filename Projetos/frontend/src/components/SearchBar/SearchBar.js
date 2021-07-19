import { Box, IconButton, InputAdornment, InputBase, Paper, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './SearchBar.styles';

export const SearchBar = () => {
  const classes = useStyles();

  return (
    <Box component="form" width="100%">
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Procurar processos..."
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
