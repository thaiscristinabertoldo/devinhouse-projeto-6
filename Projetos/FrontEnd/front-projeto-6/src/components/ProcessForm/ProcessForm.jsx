import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import {
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Dialog,
  MenuItem,
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
  const assuntos = [];
  useEffect(() => {
    // TODO: criar uma listagem de todos os assuntos
    axios.get("http://localhost:8080/backend/v1/assunto").then(({ data }) => {
      console.log(data);
      data
        .filter((assunto, index) => {
          // console.log(assunto.flAtivo, index);
          return assunto.flAtivo === true;
        })
        .forEach((assunto) => {
          console.log(assunto);
          assuntos.push(assunto.descricao);
          console.log(assuntos);
        });
    });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={isSmallScreen}
      aria-labelledby="criação de processos"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>teste</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth={isSmallScreen}
            autoFocus
            required
            margin="dense"
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
          <TextField
            select
            required
            margin="dense"
            id="assunto"
            name="assunto"
            label="Assunto do Processo"
            value={formik.values.assunto}
            onChange={formik.handleChange}
            error={formik.touched.assunto && Boolean(formik.errors.assunto)}
            helperText={formik.touched.assunto && formik.errors.assunto}
          >
            {assuntos.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth={isSmallScreen}
            required
            multiline
            minRows={3}
            margin="dense"
            id="descricao"
            name="descricao"
            label="Descrição do Processo"
            value={formik.values.descricao}
            onChange={formik.handleChange}
            error={formik.touched.descricao && Boolean(formik.errors.descricao)}
            helperText={formik.touched.descricao && formik.errors.descricao}
          />
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
