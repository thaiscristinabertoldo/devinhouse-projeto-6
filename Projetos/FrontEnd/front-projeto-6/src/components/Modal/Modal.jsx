import { useTheme } from "@emotion/react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContentText,
  DialogContent,
  DialogActions,
  useMediaQuery,
} from "@material-ui/core";
import { useThemes } from "context/ThemeProvider";

export const Modal = ({ handleClose, handleClickOpen, open }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      aria-labelledby="criação de processos"
    >
      <DialogTitle>Criação de Processo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
