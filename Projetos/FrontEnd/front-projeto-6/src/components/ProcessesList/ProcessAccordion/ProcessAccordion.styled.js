import {
  Accordion as MuiAccordion,
  Typography as MuiTypography,
  Button as MuiButton,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
  flexShrink: 0,
}));

const Button = styled(MuiButton)(({ theme }) => ({
  color: theme.palette.error,
}));

export { Accordion, Typography, Button };
