import { Box, Paper } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const BOX = styled(Box)({
  width: "90%",
  marginLeft: "5%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const PAPER = styled(Paper)({
  padding: "16px",
});

const BOXSMALLBUTTON = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px",
});

const BOXCOLUMN = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const BOXROW = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(2),
}));

const BOXHEADER = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
});

const BOXFIELD = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "8px",
});

export { BOXSMALLBUTTON, BOX, PAPER, BOXCOLUMN, BOXROW, BOXHEADER, BOXFIELD };
