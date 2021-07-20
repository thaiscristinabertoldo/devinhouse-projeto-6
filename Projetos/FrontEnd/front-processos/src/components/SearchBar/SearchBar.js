import { InputAdornment, OutlinedInput } from '@material-ui/core'
import IconSearch from '@material-ui/icons/Search'

import { useStyles } from './SearchBar.styles'

export const SearchBar = () => {
  const classes = useStyles()
  return (
    <div className={classes.search}>
      <OutlinedInput
        fullWidth
        placeholder='Buscar...'
        startAdornment={
          <InputAdornment position='start'>
            <IconSearch />
          </InputAdornment>
        }
      />
    </div>
  )
}
