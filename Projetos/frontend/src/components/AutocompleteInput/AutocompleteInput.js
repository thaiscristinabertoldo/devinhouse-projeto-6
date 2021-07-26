import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export const AutocompleteInput = (props) => {
  const [inputValue, setInputValue] = useState();
  const { options = [], labelProperty = 'descricao', field, form, label, renderOption, error, helperText } = props;

  return (
    <Autocomplete
      options={options}
      getOptionDisabled={(option) => option['flAtivo']?.toUpperCase() === 'N'}
      // getOptionSelected={(option, value) => option[labelProperty] === value[labelProperty]}
      getOptionLabel={(option) => option[labelProperty]}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      value={form.values[field.name]}
      onChange={(e, value) => {
        form.setFieldValue(field.name, value !== null ? value : '');
      }}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          error={error}
          helperText={helperText}
          name={field.name}
          label={label}
          placeholder={field.placeholder}
          variant="outlined"
          inputProps={{ ...params.inputProps, autoComplete: 'off' }}
        />
      )}
    />
  );
};
