import { useState } from "react";
import { Button, IconButton, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import * as Styled from "./ProcessHeader.styled";

export const ProcessHeader = ({
  changeProcessKey,
  clearButton,
  toggleClearButton,
  toggleIsCreateProcess,
}) => {
  const [findProcess, setFindProcess] = useState("");

  return (
    <Styled.Box>
      <Styled.TextField
        fullWidth
        value={findProcess}
        onChange={(event) => setFindProcess(event.target.value)}
        label="Buscar por chave"
        placeholder="Buscar por chave"
        variant="outlined"
        name="TextFind"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {clearButton ? (
                <IconButton
                  className="ResetSearch"
                  onClick={() => {
                    setFindProcess("");
                    toggleClearButton();
                  }}
                >
                  <HighlightOffIcon />
                </IconButton>
              ) : (
                <IconButton
                  className="Search"
                  onClick={() => changeProcessKey(findProcess)}
                >
                  <SearchIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      <Styled.Box>
        <Button
          size="large"
          variant="contained"
          onClick={toggleIsCreateProcess}
        >
          Novo Processo
        </Button>
      </Styled.Box>
    </Styled.Box>
  );
};
