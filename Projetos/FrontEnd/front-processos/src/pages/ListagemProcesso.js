import React, { useState } from 'react'
import { Button, Collapse, Grid, TextField, Typography } from '@material-ui/core'
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
      <Grid container spacing="3">
        <Grid item xs={6}>
          <Typography variant="h6" display="inline">
            Processos
          </Typography>

          <Button className={classes.btnFiltrar} onClick={handleChange}>
            Filtro
          </Button>
          <Collapse in={checked}>
            <TextField id="outlined-basic" label="Chave do processo" variant="outlined" />
          </Collapse>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" className={classes.btnNovo} onClick={() => setIsModalVisible(true)}>
            NOVO
          </Button>
          <ModalProcesso open={isModalVisible} onClose={() => setIsModalVisible(false)}></ModalProcesso>
        </Grid>
      </Grid>
    </>
  )
}
export default ListagemProceso
