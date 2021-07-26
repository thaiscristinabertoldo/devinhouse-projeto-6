import {
  Box as MuiBox,
  Typography as MuiTypography,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const Box = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
  fontWeight: "bold",
}));

export { Box, Typography };
