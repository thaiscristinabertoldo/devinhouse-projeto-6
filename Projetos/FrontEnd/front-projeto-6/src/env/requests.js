import axios from "axios";
import { BACKEND_URI, CONTENT_TYPE_JSON, newYear, PROCESS_PATH } from "./env";

const submitNewProcess = (EditedProcess, keycloakToken) => {
  console.log({
    sgOrgaoSetor: EditedProcess.sgOrgaoSetor,
    cdAssunto: EditedProcess.cdAssunto,
    cdInteressado: EditedProcess.cdInteressado,
    descricao: EditedProcess.descricao,
    nuAno: newYear(),
  });
  axios
    .post(
      BACKEND_URI + PROCESS_PATH,
      {
        sgOrgaoSetor: EditedProcess.sgOrgaoSetor,
        cdAssunto: EditedProcess.cdAssunto,
        cdInteressado: EditedProcess.cdInteressado,
        descricao: EditedProcess.descricao,
        nuAno: newYear(),
      },
      {
        headers: {
          Authorization: "Bearer " + keycloakToken,
          "Content-Type": CONTENT_TYPE_JSON,
        },
      },
    )
    .then((data) => console.log(data))
    .catch(function (error) {
      console.log("error: ", error);
    });
};

const submitUpdatedProcess = (process, EditedProcess, keycloakToken) => {
  axios
    .put(
      BACKEND_URI + PROCESS_PATH + "/id/" + process.id,
      JSON.stringify({
        sgOrgaoSetor: EditedProcess.sgOrgaoSetor,
        cdAssunto: EditedProcess.cdAssunto,
        cdInteressado: EditedProcess.cdInteressado,
        descricao: EditedProcess.descricao,
        nuAno: process.nuAno,
      }),
      {
        headers: {
          Authorization: "Bearer " + keycloakToken,
          "Content-Type": CONTENT_TYPE_JSON,
        },
      },
    )
    .then((data) => console.log(data))
    .catch(function (error) {
      console.log("error: ", error);
    });
};

const getSubjects = (setSubjectState, keycloakToken) => {
  axios
    .get(BACKEND_URI + SUBJECT_PATH, {
      headers: {
        Authorization: "Bearer " + keycloakToken,
        "Content-Type": CONTENT_TYPE_JSON,
      },
    })
    .then(({ data }) => {
      setSubjectState(data.filter((assunto) => assunto.flAtivo === true));
    });
};

const getStakeholders = (setStakeholderState) => {
  axios
    .get(BACKEND_URI + STAKEHOLDER_PATH, {
      headers: {
        Authorization: "Bearer " + keycloakToken,
        "Content-Type": CONTENT_TYPE_JSON,
      },
    })
    .then(({ data }) => {
      setStakeholderState(
        data.filter((interessado) => interessado.flAtivo === true),
      );
    });
};

export { submitNewProcess, submitUpdatedProcess, getSubjects, getStakeholders };
