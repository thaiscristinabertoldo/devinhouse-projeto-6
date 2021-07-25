import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Dialog,
  Stack,
  MenuItem,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useKeycloak } from "@react-keycloak/web";
import {
  BACKEND_URI,
  FORM_INITIAL_VALUES,
  PROCESS_PATH,
  STAKEHOLDER_PATH,
  SUBJECT_PATH,
  validationSchema,
} from "env";
import { submitNewProcess, submitUpdatedProcess } from "env/requests";
import axios from "axios";

export const ProcessForm = (props) => {
  const {
    open,
    setOpen,
    isEditing,
    setIsEditing,
    editingData,
    setEditingData,
  } = props;
  const [subjects, setSubjects] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { keycloak } = useKeycloak();
  const handleClose = () => setOpen(false);

  const formEditingValues = (process) => {
    return {
      sgOrgaoSetor: process.sgOrgaoSetor,
      cdAssunto: process.cdAssunto.id,
      cdInteressado: process.cdInteressado.id,
      descricao: process.descricao,
      nuAno: process.nuAno,
    };
  };
  const instance = axios.create({
    baseURL: BACKEND_URI,
    headers: { Authorization: "Bearer " + keycloak.token },
  });

  const formik = useFormik(
    isEditing
      ? {
          initialValues: formEditingValues(editingData),
          validationSchema: validationSchema,
          onSubmit: (formData) =>
            submitUpdatedProcess(editingData, formData, keycloak.token),
        }
      : {
          initialValues: FORM_INITIAL_VALUES,
          validationSchema: validationSchema,
          onSubmit: (formData) => submitNewProcess(formData, keycloak.token),
        },
  );

  useEffect(() => {
    instance.get(SUBJECT_PATH).then(({ data }) => {
      setSubjects(data);
      // .filter((assunto) => assunto.flAtivo === true
    });
    instance.get(STAKEHOLDER_PATH).then(({ data }) => {
      setStakeholders(data);
      // .filter((interessado) => interessado.flAtivo === true),
    });
  }, []);

  return (
    open && (
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={isSmallScreen}
        fullWidth
        maxWidth="md"
        aria-labelledby="criação de processos"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Criação de Processo</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                fullWidth
                sx={{ marginTop: 1 }}
                autoFocus
                required
                id="sgOrgaoSetor"
                name="sgOrgaoSetor"
                label="Sigla do Orgão"
                value={formik.values.sgOrgaoSetor}
                onChange={formik.handleChange}
                error={
                  formik.touched.sgOrgaoSetor &&
                  Boolean(formik.errors.sgOrgaoSetor)
                }
                helperText={
                  formik.touched.sgOrgaoSetor && formik.errors.sgOrgaoSetor
                }
              />
              <TextField
                select
                required
                fullWidth
                id="cdAssunto"
                name="cdAssunto"
                label="Assunto do Processo"
                value={formik.values.cdAssunto}
                onChange={formik.handleChange}
                error={
                  formik.touched.cdAssunto && Boolean(formik.errors.cdAssunto)
                }
                helperText={formik.touched.cdAssunto && formik.errors.cdAssunto}
              >
                {subjects.map((subject, index) => (
                  <MenuItem
                    key={subject.descricao + index}
                    value={subject.id}
                    disabled={!subject.flAtivo}
                  >
                    {subject.descricao} {!subject.flAtivo && " (inativo)"}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                required
                fullWidth
                id="cdInteressado"
                name="cdInteressado"
                label="interessado"
                value={formik.values.cdInteressado}
                onChange={formik.handleChange}
                error={
                  formik.touched.cdInteressado &&
                  Boolean(formik.errors.cdInteressado)
                }
                helperText={
                  formik.touched.cdInteressado && formik.errors.cdInteressado
                }
              >
                {stakeholders.map((stakeholder, index) => (
                  <MenuItem
                    key={stakeholder.nmInteressado + index}
                    value={stakeholder.id}
                    disabled={!stakeholder.flAtivo}
                  >
                    {stakeholder.nmInteressado}
                    {!stakeholder.flAtivo && " (inativo)"}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                required
                multiline
                minRows={3}
                id="descricao"
                name="descricao"
                label="Descrição do Processo"
                value={formik.values.descricao}
                onChange={formik.handleChange}
                error={
                  formik.touched.descricao && Boolean(formik.errors.descricao)
                }
                helperText={formik.touched.descricao && formik.errors.descricao}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" type="submit">
              {isEditing ? "Editar Processo" : "Criar Processo"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  );
};

ProcessForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
  editingData: PropTypes.object,
  setEditingData: PropTypes.func,
};
