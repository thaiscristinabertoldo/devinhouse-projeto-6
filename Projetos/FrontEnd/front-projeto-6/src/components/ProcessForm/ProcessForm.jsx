import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Dialog,
  Autocomplete,
  Stack,
  MenuItem,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useKeycloak } from "@react-keycloak/web";

const validationSchema = yup.object({
  sgOrgaoSetor: yup
    .string("Defina a sigla do órgão")
    .length(4, "A sigla deve conter 4 caracteres")
    .required("A sigla é obrigatória"),
  cdAssunto: yup
    .number("Descreva o processo")
    .required("A descrição é obrigatória"),
  cdInteressado: yup
    .number("Descreva o processo")
    .required("A descrição é obrigatória"),
  descricao: yup
    .string("Descreva o processo")
    .required("A descrição é obrigatória"),
});

export const ProcessForm = ({ setOpen, open }) => {
  const [assuntos, setAssuntos] = useState([]);
  const [interessados, setInteressados] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { keycloak } = useKeycloak();
  const handleClose = () => setOpen(false);
  const instance = axios.create({
    baseURL: "http://localhost:8080/backend",
    headers: { Authorization: "Bearer " + keycloak.token },
  });

  const formik = useFormik({
    initialValues: {
      sgOrgaoSetor: "",
      cdassunto: 0,
      cdInteressado: 0,
      descricao: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(
        JSON.stringify({ ...values, nuAno: new Date().getFullYear() }, null, 2),
      );
      axios
        .post(
          "http://localhost:8080/backend/v1/processo",
          JSON.stringify({ ...values, nuAno: new Date().getFullYear() }, null),
          {
            headers: {
              Authorization: "Bearer " + keycloak.token,
              "Content-Type": "application/json",
            },
          },
        )
        .then((data) => console.log(data));
    },
  });

  useEffect(() => {
    instance.get("/v1/assunto").then(({ data }) => {
      setAssuntos(data.filter((assunto) => assunto.flAtivo === true));
    });

    instance.get("/v1/interessado").then(({ data }) => {
      setInteressados(
        data.filter((interessado) => interessado.flAtivo === true),
      );
    });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isSmallScreen}
      fullWidth
      maxWidth="md"
      aria-labelledby="criação de processos"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>teste</DialogTitle>
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
            {console.log(assuntos, interessados)}
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
              {assuntos.map((assuntos) => (
                <MenuItem key={assuntos.descricao} value={assuntos.id}>
                  {assuntos.descricao}
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
              {interessados.map((interessado) => (
                <MenuItem
                  key={interessado.nmInteressado}
                  value={interessado.id}
                >
                  {interessado.nmInteressado}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth={isSmallScreen}
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
            Criar Processo
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

ProcessForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
