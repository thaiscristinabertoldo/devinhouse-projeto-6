import { Modal } from '@material-ui/core'
import { useStyles } from './ModalProcesso.styles'

const ModalProcesso = ({ open, onClose }) => {
  const classes = useStyles()

  return (
    <Modal open={open} onClose={onClose} className={classes.modal}>
      <div className={classes.paper}>
        <h2 id="transition-modal-title">Transition modal</h2>
      </div>
    </Modal>
  )
}

export default ModalProcesso
