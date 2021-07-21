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
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import * as yup from "yup";

const validationSchema = yup.object({
  siglaOrgao: yup
    .string("Defina a sigla do órgão")
    .length(4, "A sigla deve conter 4 caracteres")
    .required("A sigla é obrigatória"),
  assunto: yup
    .string("Descreva o processo")
    .required("A descrição é obrigatória"),
  interessado: yup
    .string("Descreva o processo")
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
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      siglaOrgao: "",
      assunto: "",
      interessado: "",
      descricao: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    axios.get("http://localhost:8080/backend/v1/assunto").then(({ data }) => {
      setAssuntos(data.filter((assunto) => assunto.flAtivo === true));
    });

    axios
      .get("http://localhost:8080/backend/v1/interessado")
      .then(({ data }) => {
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
              id="siglaOrgao"
              name="siglaOrgao"
              label="Sigla do Orgão"
              value={formik.values.siglaOrgao}
              onChange={formik.handleChange}
              error={
                formik.touched.siglaOrgao && Boolean(formik.errors.siglaOrgao)
              }
              helperText={formik.touched.siglaOrgao && formik.errors.siglaOrgao}
            />
            <Autocomplete
              id="assuntos"
              required
              options={assuntos}
              getOptionLabel={(assunto) => assunto.descricao}
              renderInput={(params) => {
                return <TextField {...params} label="Assunto" />;
              }}
            />
            <Autocomplete
              id="interessado"
              required
              options={interessados}
              getOptionLabel={(interessado) => interessado.descricao}
              renderInput={(params) => {
                return <TextField {...params} label="Assunto" />;
              }}
            />
            {/* <TextField
              select
              required
              fullWidth
              id="assunto"
              name="assunto"
              label="Assunto do Processo"
              value={formik.values.assunto}
              onChange={formik.handleChange}
              error={formik.touched.assunto && Boolean(formik.errors.assunto)}
              helperText={formik.touched.assunto && formik.errors.assunto}
            >
              {assuntos.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
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
            Submit
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
