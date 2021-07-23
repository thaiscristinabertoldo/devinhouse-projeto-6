import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({
  title,
  description,
  onAccepted,
  open,
  toggleOpenAlert,
}) {
  return (
    <div>
      <Dialog open={open} onClose={toggleOpenAlert}>
        <DialogTitle className="AlertTitle">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleOpenAlert}>Voltar</Button>
          <Button onClick={onAccepted} autoFocus>
            Aceitar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
