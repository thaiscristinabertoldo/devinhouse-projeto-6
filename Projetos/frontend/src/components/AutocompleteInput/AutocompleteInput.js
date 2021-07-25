import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export const AutocompleteInput = (props) => {
  const [inputValue, setInputValue] = useState();

  const {
    options = [],
    labelProperty = 'descricao',
    field = { name: 'noname', label: 'nolabel' },
    form,
    renderOption,
  } = props;

  console.log(props);

  return (
    <Autocomplete
      options={options}
      getOptionDisabled={(option) => option['flAtivo']?.toUpperCase() === 'N'}
      getOptionLabel={(option) => option[labelProperty]}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={renderOption}
      onChange={(e, value) => {
        form.setFieldValue(field.name, value !== null ? value : '');
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          name={field.name}
          label={props.label}
          variant="outlined"
          inputProps={{ ...params.inputProps, autoComplete: 'off' }}
        />
      )}
    />
  );
};
