import { Box, IconButton, InputAdornment, InputBase, Paper, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useSearchContext } from '../../contexts/search-context';
import { useStyles } from './SearchBar.styles';

export const SearchBar = () => {
  const classes = useStyles();

  const { onChangeSearchType, searchType, onChangeSearchKey, searchKey, loadProcessListOfSearch, process } =
    useSearchContext();

  const handleSearch = () => {
    loadProcessListOfSearch();
  };

  return (
    <Box component="form" width="100%">
      <Paper>
        <TextField
          value={searchKey}
          onChange={(e) => onChangeSearchKey(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="Procurar processos..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                  onClick={(e) => {
                    e.preventDefault();
                    return handleSearch();
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </Box>
  );
};
