import React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

export const Selector = ({ value, label }) => (
  <FormControlLabel value={value} control={<Radio color="primary" />} label={label} labelPlacement="end" />
);

export const SelectorGroup = ({ children: selectors, value, onChange, name = 'searchContext' }) => (
  <RadioGroup
    data-testid="custom-selector-group"
    row
    name={name}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    {selectors}
  </RadioGroup>
);
