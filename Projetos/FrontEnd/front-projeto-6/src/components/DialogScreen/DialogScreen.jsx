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
import PropTypes from "prop-types";

export const DialogScreen = ({ setOpen, open, children, title, Raw }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => setOpen(false);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      aria-labelledby="criação de processos"
    >
      {Raw ? (
        children
      ) : (
        <form>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogContent>
            <DialogContentText>{children}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              cancel
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

DialogScreen.propTypes = {
  children: PropTypes.node.isRequired,
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  Raw: PropTypes.bool,
};

DialogScreen.defaultProps = {
  Raw: false,
};
