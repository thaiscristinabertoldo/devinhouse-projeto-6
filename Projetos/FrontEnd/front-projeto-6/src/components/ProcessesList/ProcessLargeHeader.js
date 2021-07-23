import { Button, TextField } from "@material-ui/core";
import * as Styled from "./ProcessesList.styled";

export const ProcessLargeHeader = ({
  find,
  ChangeFind,
  getProcessesFind,
  buttonFind,
  ClearFind,
}) => {
  return (
    <Styled.BOXHEADER>
      <Styled.BOXROW>
        <TextField
          value={find}
          onChange={ChangeFind}
          label="Buscar por chave"
          variant="outlined"
        />
        {buttonFind ? (
          <Button size="large" onClick={ClearFind}>
            Limpar Busca
          </Button>
        ) : (
          <Button size="large" onClick={getProcessesFind}>
            Buscar
          </Button>
        )}
      </Styled.BOXROW>
      <Button size="large" variant="contained">
        Novo
      </Button>
    </Styled.BOXHEADER>
  );
};
