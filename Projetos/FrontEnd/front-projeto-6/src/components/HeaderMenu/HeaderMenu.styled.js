import { Button } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const BoxMenu = styled(Button)(({ theme }) => ({
  height: "64px",
  width: "100px",
  borderRadius: "unset",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  color: theme.palette.secondary.dark,
}));

export { BoxMenu };
