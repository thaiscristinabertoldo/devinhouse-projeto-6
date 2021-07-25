import { useEffect, useState } from "react";
import AlertDialog from "components/AlertDialog/AlertDialog";
import { ProcessAccordion } from "./ProcessAccordion/ProcessAccordion";
import * as Styled from "./ProcessesList.styled";
import { ProcessHeader } from "./ProcessHeader/ProcessHeader";
import { ProcessForm } from "components/ProcessForm/ProcessForm";
import axios from "axios";
import { Button, Skeleton, Typography } from "@material-ui/core";
import { BACKEND_URI } from "env";
import { useKeycloak } from "@react-keycloak/web";

export function ProcessesList() {
  const [processes, setProcesses] = useState({});

  const [openAlert, setOpenAlert] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteProcessId, setDeleteProcessId] = useState("");
  const [clearButton, setClearButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [emptyFind, setEmptyFind] = useState(false);

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

  function changeProcessByNumber(number) {
    if (number !== "") {
      toggleClearButton();
      getProcessByNumber(number);
    }
  }

  function changeProcessByMatter(matter) {
    if (matter !== "") {
      toggleClearButton();
      getProcessByMatter(matter);
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

  function getProcessByNumber(number) {
    instance
      .get(
        "http://localhost:8080/backend/v1/processo/numeroprocesso?q=" + number,
      )
      .then((response) => {
        setProcesses(response.data);
      })
      .catch(function (error) {
        console.log("error: ", error);
        setEmptyFind((old) => !old);
      });
  }

  function getProcessByMatter(matter) {
    instance
      .get(
        "http://localhost:8080/backend/v1/processo/cdassuntodescrisao?q=" +
          matter,
      )
      .then((response) => {
        setProcesses(response.data);
      })
      .catch(function (error) {
        console.log("error: ", error);
        setEmptyFind((old) => !old);
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
      {keycloak.token === undefined && (
        <Styled.Box>
          <Styled.Paper>
            <Typography align="center">
              Você precisa fazer o login para utilizar o site
            </Typography>
          </Styled.Paper>
        </Styled.Box>
      )}
      {processes ? (
        <Styled.Box>
          <Styled.Paper>
            <ProcessHeader
              changeProcessByMatter={changeProcessByMatter}
              changeProcessByNumber={changeProcessByNumber}
              clearButton={clearButton}
              toggleClearButton={toggleClearButton}
              toggleIsCreateProcess={toggleIsCreateProcess}
              emptyFind={emptyFind}
            />

            {emptyFind ? (
              <Styled.Box>
                <Styled.Paper>
                  <Typography>
                    Opss, não conseguimos encontrar nada parecido com o que foi
                    informado.
                  </Typography>
                  <Button onClick={() => setEmptyFind((old) => !old)}>
                    Atualizar
                  </Button>
                </Styled.Paper>
              </Styled.Box>
            ) : (
              <>
                {Object.entries(processes).length === 0 ? (
                  <>
                    <Typography>
                      Não temos nenhum processo criado, que tal criar um?
                    </Typography>
                  </>
                ) : (
                  <>
                    {processes.map((process) => (
                      <ProcessAccordion
                        key={process.id}
                        process={process}
                        onChangeDeleteProcessId={onChangeDeleteProcessId}
                        toggleIsEditing={toggleIsEditing}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </Styled.Paper>
        </Styled.Box>
      ) : (
        <Styled.Box>
          <Styled.Paper>
            <ProcessHeader />
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Skeleton animation="wave" width="100%" key={item}>
                <ProcessAccordion
                  process={{
                    chaveProcesso: item,
                    descrisao: item,
                    cdAssunto: { descricao: item },
                    cdInteressado: { nmInteressado: item },
                  }}
                />
              </Skeleton>
            ))}
          </Styled.Paper>
        </Styled.Box>
      )}
    </>
  );
}
