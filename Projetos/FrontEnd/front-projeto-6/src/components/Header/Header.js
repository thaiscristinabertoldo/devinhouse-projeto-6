import { useContext } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  AccountBalance,
  AccountCircle,
  DarkMode,
  LightMode,
} from '@material-ui/icons';
import { ThemeContext } from 'theme';
import * as S from './Header.styled';

export const Header = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <>
      <S.Header>
        <Typography>Jboys - Consultoria</Typography>

        <IconButton onClick={toggleTheme}>
          {theme?.palette?.mode === 'dark' ? <DarkMode /> : <LightMode />}
        </IconButton>

        <IconButton onClick={() => {}}>
          <AccountCircle />
        </IconButton>
      </S.Header>

      <S.Spacing />
    </>
  );
};
