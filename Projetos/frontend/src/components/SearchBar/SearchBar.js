import { Box, IconButton, InputAdornment, makeStyles, Paper, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export const SearchBar = ({ onSearch, term, setTerm }) => {
  const classes = useStyles();

  return (
    <Box component="form" width="100%">
      <Paper>
        <TextField
          value={term}
          onChange={(e) => setTerm(e.target.value)}
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
                    onSearch();
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

const useStyles = makeStyles({
  iconButton: {
    padding: 10,
  },
});
