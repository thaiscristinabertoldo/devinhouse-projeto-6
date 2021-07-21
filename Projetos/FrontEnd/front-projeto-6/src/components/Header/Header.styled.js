import { AppBar } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const HEADER_HEIGHT = 8;

const Header = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.dark,
  height: theme.spacing(HEADER_HEIGHT),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(3),
}));

const Spacing = styled("div")(({ theme }) => ({
  height: theme.spacing(HEADER_HEIGHT),
}));

export { Header, Spacing };
