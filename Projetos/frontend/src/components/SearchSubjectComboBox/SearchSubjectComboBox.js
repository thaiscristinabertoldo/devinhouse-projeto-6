import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { subjectsList } from '../../mock';
import { useStyles } from './SearchSubjectComboBox.styles';

export default function SearchSubjectComboBox() {
  const classes = useStyles();

  return (
    <Autocomplete
      id="search_combo_box"
      style={{ width: '100%' }}
      options={subjectsList}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => {
        console.log(option);
        return option.id + ' - ' + option.descricao;
      }}
      renderOption={(option) => (
        <>
          {option.id} - {option.descricao} - {option.dtCadastro} - {option.flAtivo}
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Informe a descrição do assunto"
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
