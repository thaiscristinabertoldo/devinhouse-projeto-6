import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog({
  title,
  desc,
  onClick,
  open,
  ToggleAlert,
}) {
  return (
    <div>
      <Dialog open={open} onClose={ToggleAlert}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{desc}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ToggleAlert}>Voltar</Button>
          <Button onClick={onClick} autoFocus>
            Aceitar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
