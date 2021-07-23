import { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AlertDialog from "components/Dialogs/AlertDialog";
import { mockProcces } from "./mock";
import { ProcessAccordion } from "./ProcessAccordion";
import * as Styled from "./ProcessesList.styled";
import { ProcessLargeHeader } from "./ProcessLargeHeader";
import { ProcessSmallHeader } from "./ProcessSmallHeader";

const mock = mockProcces;

export function ProcessesList() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [processes, setProcesses] = useState();
  const [find, setFind] = useState("");
  const [buttonFind, setButtonFind] = useState(false);
  const [alertDialog, setAlertDialog] = useState({
    id: 0,
    open: false,
  });

  function ToggleAlert() {
    setAlertDialog((old) => ({ ...old, id: 0, open: !old }));
  }

  async function DELETEProcess() {
    //  await console.log("Excluiu " + alertDialog.id);
    ToggleAlert();
    getProcess();
  }

  function ChangeFind(event) {
    setFind(event.target.value);
  }

  function ClearFind() {
    setButtonFind((old) => !old);
    setFind("");
    getProcess();
  }

  async function getProcessesFind() {
    if (find !== "") {
      setButtonFind((old) => !old);
      console.log("find");
    }
  }

  async function getProcess() {
    await setProcesses(mock);
    console.log("mock");
  }

  useEffect(() => {
    getProcess();
  }, []);

  return (
    <>
      <AlertDialog
        open={alertDialog.open}
        ToggleAlert={ToggleAlert}
        onClick={DELETEProcess}
        title="Exclusão de processo"
        desc="Você tem certeza que deseja excluir esse processo? Essa operação será permanente."
      />
      {processes && (
        <Styled.BOX>
          <Styled.PAPER sx={{ width: "90%", overflow: "hidden" }}>
            {isSmallScreen ? (
              <ProcessSmallHeader
                find={find}
                ChangeFind={ChangeFind}
                getProcessesFind={getProcessesFind}
                buttonFind={buttonFind}
                ClearFind={ClearFind}
              />
            ) : (
              <ProcessLargeHeader
                find={find}
                ChangeFind={ChangeFind}
                getProcessesFind={getProcessesFind}
                buttonFind={buttonFind}
                ClearFind={ClearFind}
              />
            )}
            {processes.map((process) => (
              <ProcessAccordion
                key={process.id}
                process={process}
                setAlertDialog={setAlertDialog}
              />
            ))}
          </Styled.PAPER>
        </Styled.BOX>
      )}
    </>
  );
}
