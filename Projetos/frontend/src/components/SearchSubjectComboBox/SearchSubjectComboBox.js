import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from './SearchSubjectComboBox.styles';

export const SearchSubjectComboBox = (props) => {
  const classes = useStyles();

  return (
    <Autocomplete
      id="search_combo_box"
      style={{ width: '100%' }}
      options={[]}
      getOptionDisabled={(option) => option.flAtivo?.toUpperCase() === 'N'}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => {
        return option.descricao;
      }}
      renderOption={(option) => (
        <>
          {option.id} - {option.descricao} - {option.dtCadastro}
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Informe a descrição do assunto"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
          className={classes.comboBox}
          name="cdAssunto"
          error={props?.error}
          autoComplete="false"
        />
      )}
      {...props}
      onChange={(e, value) => {
        console.log('value', value);
        props.setFieldValue('cdAssunto', value !== null ? value : '');
      }}
    />
  );
};
