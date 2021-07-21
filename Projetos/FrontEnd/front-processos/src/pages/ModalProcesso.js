import { Modal } from '@material-ui/core'
import { useStyles } from './ModalProcesso.styles'
import { Grid, Paper, TextField } from '@material-ui/core'

const ModalProcesso = ({ open, onClose }) => {
  const classes = useStyles()

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        <h2 id="transition-modal-title">Criando Processo</h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <TextField id="outlined-basic" label="Orgão Setor" variant="outlined" />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <TextField id="outlined-basic" label="Ano" variant="outlined" />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TextField id="outlined-basic" label="Descrição" variant="outlined" />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}

export default ModalProcesso
