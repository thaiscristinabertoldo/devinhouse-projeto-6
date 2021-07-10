import { Typography } from '@material-ui/core';
import { Spacing, StyledHeader } from './Header.styled';

export function Header() {
  return (
    <>
      <StyledHeader>
        <Typography>Jboys - Consulta de Processos</Typography>
      </StyledHeader>
      <Spacing />
    </>
  );
}
