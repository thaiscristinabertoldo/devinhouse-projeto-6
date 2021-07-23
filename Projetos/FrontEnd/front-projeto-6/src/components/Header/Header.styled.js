import {
  AppBar as MuiAppbar,
  Box as MuiBox,
  IconButton as MuiIconButton,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const HEADER_HEIGHT = 8;

const AppBar = styled(MuiAppbar)(({ theme }) => ({
  background: theme.palette.primary.dark,
  height: theme.spacing(HEADER_HEIGHT),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(3),
}));

const Box = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}));

const IconButton = styled(MuiBox)(({ theme }) => ({
  color: "white",
  marginRight: theme.spacing(2),
}));

const Spacing = styled("div")(({ theme }) => ({
  height: theme.spacing(HEADER_HEIGHT),
}));

export { AppBar, Spacing, Box, IconButton };
