import React from 'react';
import { Icon, IconButton } from '@material-ui/core';

export const ButtonWithIcon = ({ onClick, iconName, color = 'primary' }) => (
  <IconButton color={color} size="medium" onClick={onClick}>
    <Icon>{iconName}</Icon>
  </IconButton>
);
