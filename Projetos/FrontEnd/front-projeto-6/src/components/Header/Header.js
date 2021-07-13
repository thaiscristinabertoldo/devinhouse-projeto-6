import { Typography } from "@material-ui/core";
import { ThemeAnimation } from "components/ThemeAnimation";
import { StyledHeader, Spacing } from "./Header.styled";

export const Header = () => {
  return (
    <>
      <StyledHeader>
        <Typography>Jboys - Consulta de Processos</Typography>
        <ThemeAnimation />
      </StyledHeader>
      <Spacing />
    </>
  );
};
