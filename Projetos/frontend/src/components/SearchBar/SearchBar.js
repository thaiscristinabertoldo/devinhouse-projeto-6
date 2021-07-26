import { Box, IconButton, InputAdornment, makeStyles, Paper, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
  const classes = useStyles();
  const [term, setTerm] = useState('');

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
                    onSearch(term);
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
