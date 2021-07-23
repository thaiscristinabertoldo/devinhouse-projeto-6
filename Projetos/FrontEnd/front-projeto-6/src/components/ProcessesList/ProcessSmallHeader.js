import { Button, TextField } from "@material-ui/core";
import * as Styled from "./ProcessesList.styled";

export const ProcessSmallHeader = ({
  find,
  ChangeFind,
  getProcessesFind,
  buttonFind,
  ClearFind,
}) => {
  return (
    <Styled.BOXCOLUMN>
      <TextField
        value={find}
        onChange={ChangeFind}
        fullWidth
        label="Buscar por chave"
        variant="outlined"
      />
      <Styled.BOXSMALLBUTTON>
        {buttonFind ? (
          <Button size="large" onClick={ClearFind}>
            Limpar Busca
          </Button>
        ) : (
          <Button size="large" onClick={getProcessesFind}>
            Buscar
          </Button>
        )}
        <Button size="large" variant="contained">
          Novo
        </Button>
      </Styled.BOXSMALLBUTTON>
    </Styled.BOXCOLUMN>
  );
};
