import { useState } from 'react'
import { Button, Collapse, TextField } from '@material-ui/core'
import { useStyles } from './ListagemProcesso.styles'
import ModalProcesso from './ModalProcesso'

const ListagemProceso = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  const classes = useStyles()

  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <>
      <h1>Processos</h1>
      <Button className={classes.btnFiltrar} onClick={handleChange}>
        Filtro
      </Button>
      <Collapse in={checked}>
        <TextField id="outlined-basic" label="Assunto" variant="outlined" />

        <TextField id="outlined-basic" label="Chave do processo" variant="outlined" />
      </Collapse>
      <Button className={classes.btnNovo} onClick={() => setIsModalVisible(true)}>
        NOVO
      </Button>
      <ModalProcesso open={isModalVisible} onClose={() => setIsModalVisible(false)}></ModalProcesso>
    </>
  )
}
export default ListagemProceso
