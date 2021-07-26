import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ConfirmAlert = ({ open, onConfirm, onCancel, title = 'Título', message = 'Mensagem' }) => {
  return (
    <Dialog maxWidth="sm" open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary">
          Confirmar
        </Button>
        <Button onClick={onCancel} color="primary" autoFocus>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
