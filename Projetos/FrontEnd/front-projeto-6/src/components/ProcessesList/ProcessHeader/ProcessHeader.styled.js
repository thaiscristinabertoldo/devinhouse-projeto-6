import { Box as MuiBox, TextField as MuiTextField } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const Box = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export { Box, TextField };
