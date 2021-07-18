import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { stakeholdersList } from '../../mock';
import { useStyles } from './SearchStakeholderComboBox.styles';

export default function SearchStakeholderComboBox() {
  const classes = useStyles();

  return (
    <Autocomplete
      id="search_combo_box"
      style={{ width: '100%' }}
      options={stakeholdersList}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => {
        return option.id + ' - ' + option.nuIdentificacao;
      }}
      renderOption={(option) => (
        <>
          {option.nuIdentificacao} - {option.nmInteressado} - {option.flAtivo}
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Informe o número de identificação do interessado"
          variant="filled"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
          className={classes.comboBox}
        />
      )}
    />
  );
}
