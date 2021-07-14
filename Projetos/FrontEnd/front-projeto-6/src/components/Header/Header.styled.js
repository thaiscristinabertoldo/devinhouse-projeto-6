import { AppBar, Button } from "@material-ui/core";
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

const AccessButton = styled(Button)({
  width: "16px",
  fontSize: "8pt",
  padding: "2px",
  color: "#FFF",
  border: "1px",
  borderStyle: "solid",
});

const Spacing = styled("div")(({ theme }) => ({
  height: theme.spacing(headerHeight),
}));

export { StyledHeader, Spacing, Field, AccessButton };
