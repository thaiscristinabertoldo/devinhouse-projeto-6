import { AppBar } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const headerHeight = 6;

const StyledHeader = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.main,
  height: theme.spacing(headerHeight),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
}));

const Spacing = styled("div")(({ theme }) => ({
  height: theme.spacing(headerHeight),
}));

export { StyledHeader, Spacing };
