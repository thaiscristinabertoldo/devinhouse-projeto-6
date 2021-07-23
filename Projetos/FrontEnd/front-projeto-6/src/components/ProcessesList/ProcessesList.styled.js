import {
  Box as MuiBox,
  Paper as MuiPaper,
  Button as MuiButton,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const Box = styled(MuiBox)(({ theme }) => ({
  width: "90%",
  marginLeft: "5%",
  marginTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Paper = styled(MuiPaper)(({ theme }) => ({
  width: "90%",
  overflow: "hidden",
  padding: theme.spacing(4),
}));

const Button = styled(MuiButton)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
export { Box, Paper, Button };
