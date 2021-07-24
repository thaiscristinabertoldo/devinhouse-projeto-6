import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from './SearchStakeholderComboBox.styles';

export const SearchStakeholderComboBox = (props) => {
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
        return option.nuIdentificacao;
      }}
      renderOption={(option) => (
        <>
          {option.nuIdentificacao} - {option.nmInteressado}
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Informe o número de identificação do interessado"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
          className={classes.comboBox}
          name="cdInteressado"
          error={props?.error}
        />
      )}
      {...props}
      onChange={(e, value) => {
        console.log('value', value);
        props.setFieldValue('cdInteressado', value !== null ? value : '');
      }}
    />
  );
};
