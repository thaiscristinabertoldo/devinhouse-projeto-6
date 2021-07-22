import { Modal, Grid, TextField, Typography, Paper } from '@material-ui/core'
import { useStyles } from './ModalProcesso.styles'

const ModalProcesso = ({ open, onClose }) => {
  const classes = useStyles()

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <Paper elevation="10" className={classes.paper}>
        <Typography variant="subtitle1">Criando Processo</Typography>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField id="outlined-basic" label="Orgão Setor" variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <TextField id="outlined-basic" label="Ano" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField id="outlined-basic" fullWidth label="Descrição" variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  )
}

export default ModalProcesso
