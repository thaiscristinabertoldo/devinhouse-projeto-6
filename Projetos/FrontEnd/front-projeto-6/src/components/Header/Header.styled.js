import { AppBar } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const headerHeight = 8;

const StyledHeader = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.dark,
  height: theme.spacing(headerHeight),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(3),
}));

const Field = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(1),
}));

const Spacing = styled("div")(({ theme }) => ({
  height: theme.spacing(headerHeight),
}));

export { StyledHeader, Spacing, Field };
