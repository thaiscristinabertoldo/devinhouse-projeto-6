import { useEffect, useState } from "react";
import AlertDialog from "components/AlertDialog/AlertDialog";
import { ProcessAccordion } from "./ProcessAccordion/ProcessAccordion";
import * as Styled from "./ProcessesList.styled";
import { ProcessHeader } from "./ProcessHeader/ProcessHeader";
import { ProcessForm } from "components/ProcessForm/ProcessForm";
import axios from "axios";
import { Typography } from "@material-ui/core";

export function ProcessesList() {
  const [processes, setProcesses] = useState();

  const [openAlert, setOpenAlert] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteProcessId, setDeleteProcessId] = useState("");
  const [clearButton, setClearButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState({});

  function toggleIsCreateProcess() {
    setIsEditing((old) => !old);
    setOpenForm((old) => !old);
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

  function toggleIsEditing(id) {
    processes.map((process) => {
      if (process.id === id) {
        setEditingData(process);
      }
    });
    setIsEditing((old) => !old);
    setOpenForm((old) => !old);
  }

  function deleteProcess() {
    axios
      .delete("http://localhost:8080/backend/v1/processo/id/" + deleteProcessId)
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
    axios
      .get("http://localhost:8080/backend/v1/processo/chaveprocesso?=" + key)
      .then(function (response) {
        setProcesses(response.data);
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  }

  function getProcessList() {
    axios
      .get("http://localhost:8080/backend/v1/processo/")
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

  console.log(editingData);
  return (
    <>
      <ProcessForm
        open={openForm}
        setOpen={setOpenForm}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editingData={editingData}
        setEditingData={setEditingData}
      />
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
