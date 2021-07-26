import * as yup from "yup";

const SELF_URI = "http://localhost:3000";
const BACKEND_URI = "http://localhost:8080/backend";
const PROCESS_PATH = "/v1/processo";
const SUBJECT_PATH = "/v1/assunto";
const STAKEHOLDER_PATH = "/v1/interessado";
const CONTENT_TYPE_JSON = "application/json";

const FORM_INITIAL_VALUES = {
  sgOrgaoSetor: "",
  cdassunto: "",
  cdInteressado: "",
  descricao: "",
};

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

const newYear = () => new Date().getFullYear();

export {
  SELF_URI,
  BACKEND_URI,
  PROCESS_PATH,
  SUBJECT_PATH,
  STAKEHOLDER_PATH,
  FORM_INITIAL_VALUES,
  CONTENT_TYPE_JSON,
  validationSchema,
  newYear,
};
