import { useEffect, useState } from "react";
import AlertDialog from "components/AlertDialog/AlertDialog";
import { ProcessAccordion } from "./ProcessAccordion/ProcessAccordion";
import * as Styled from "./ProcessesList.styled";
import { ProcessHeader } from "./ProcessHeader/ProcessHeader";
import { ProcessForm } from "components/ProcessForm/ProcessForm";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { BACKEND_URI } from "env";
import { useKeycloak } from "@react-keycloak/web";

export function ProcessesList() {
  const [processes, setProcesses] = useState();

  const [openAlert, setOpenAlert] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteProcessId, setDeleteProcessId] = useState("");
  const [clearButton, setClearButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState({});

  const { keycloak } = useKeycloak();

  function toggleIsCreateProcess() {
    setIsEditing(false);
    setOpenForm(true);
  }

  function toggleIsEditing(process) {
    setEditingData(process);
    setIsEditing(true);
    setOpenForm(true);
  }

  function toggleOpenAlert() {
    setOpenAlert((old) => !old);
  }

  function toggleClearButton() {
    setClearButton((old) => !old);
  }

  function onChangeDeleteProcessId(id) {
    setOpenAlert((old) => !old);
    setDeleteProcessId(id);
  }

  function changeProcessKey(key) {
    if (key !== "") {
      toggleClearButton();
      getProcessKey(key);
    }
  }

  const instance = axios.create({
    baseURL: BACKEND_URI,
    headers: { Authorization: "Bearer " + keycloak.token },
  });

  function deleteProcess() {
    instance
      .delete("/v1/processo/id/" + deleteProcessId)
      .then(function (response) {
        if (response.status == 200) {
          toggleOpenAlert();
          getProcessList();
        }
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  }

  function getProcessKey(key) {
    instance
      .get("http://localhost:8080/backend/v1/processo/chaveProcesso?q=" + key)
      .then((response) => {
        console.log(response.data);
        setProcesses(response.data);
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  }

  function getProcessList() {
    instance
      .get("http://localhost:8080/backend/v1/processo")
      .then(function (response) {
        setProcesses(response.data);
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  }

  useEffect(() => {
    getProcessList();
  }, []);

  return (
    <>
      {openForm && (
        <ProcessForm
          open={openForm}
          setOpen={setOpenForm}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editingData={editingData}
          setEditingData={setEditingData}
        />
      )}
      <AlertDialog
        open={openAlert}
        toggleOpenAlert={toggleOpenAlert}
        onAccepted={deleteProcess}
        title="Exclusão de processo"
        description="Você tem certeza que deseja excluir esse processo? Essa operação será permanente."
      />
      {!processes && (
        <Styled.Box>
          <Styled.Paper>
            {keycloak.token === undefined ? (
              <Typography align="center">
                Você precisa fazer o login para utilizar o site
              </Typography>
            ) : (
              <>
                <Typography>
                  Não temos nenhum processo criado, que tal criar um?
                </Typography>
                <Styled.Button
                  size="large"
                  variant="contained"
                  onClick={() => toggleIsCreateProcess()}
                >
                  Novo
                </Styled.Button>
              </>
            )}
          </Styled.Paper>
        </Styled.Box>
      )}
      {processes && (
        <Styled.Box>
          <Styled.Paper>
            <ProcessHeader
              changeProcessKey={changeProcessKey}
              clearButton={clearButton}
              toggleClearButton={toggleClearButton}
              toggleIsCreateProcess={toggleIsCreateProcess}
            />
            {processes.map((process) => (
              <ProcessAccordion
                key={process.id}
                process={process}
                onChangeDeleteProcessId={onChangeDeleteProcessId}
                toggleIsEditing={toggleIsEditing}
              />
            ))}
          </Styled.Paper>
        </Styled.Box>
      )}
    </>
  );
}
