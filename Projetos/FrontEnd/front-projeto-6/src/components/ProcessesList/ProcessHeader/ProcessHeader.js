import { useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import * as Styled from "./ProcessHeader.styled";
import { useEffect } from "react";

export const ProcessHeader = ({
  changeProcessByMatter,
  changeProcessByNumber,
  clearButton,
  toggleClearButton,
  toggleIsCreateProcess,
  emptyFind,
}) => {
  const [findProcess, setFindProcess] = useState("");
  const [alignment, setAlignment] = useState("num");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    resetSearch();
  };

  function resetSearch() {
    setFindProcess("");
    if (clearButton) toggleClearButton();
  }
  useEffect(() => {
    if (!emptyFind) {
      setFindProcess("");
      if (clearButton) toggleClearButton();
      setAlignment("num");
    }
  }, [emptyFind]);
  return (
    <Styled.Box>
      <Styled.TextField
        fullWidth
        value={findProcess}
        onChange={(event) => setFindProcess(event.target.value)}
        label={alignment === "num" ? "Buscar por número" : "Buscar por assunto"}
        placeholder={
          alignment === "num" ? "Buscar por número" : "Buscar por assunto"
        }
        variant="outlined"
        name="TextFind"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {clearButton ? (
                <IconButton
                  className="ResetSearch"
                  onClick={() => resetSearch()}
                >
                  <HighlightOffIcon />
                </IconButton>
              ) : (
                <IconButton
                  className="Search"
                  onClick={() => {
                    if (alignment === "num") {
                      changeProcessByNumber(findProcess);
                    } else {
                      changeProcessByMatter(findProcess);
                    }
                  }}
                >
                  <SearchIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      <Styled.Box>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="num">Número</ToggleButton>
          <ToggleButton value="matter">Assunto</ToggleButton>
        </ToggleButtonGroup>
      </Styled.Box>
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
