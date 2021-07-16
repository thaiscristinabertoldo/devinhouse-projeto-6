import { useState } from "react";
import { Button } from "@material-ui/core";
import { Header, ProcessForm, DialogScreen } from "./components";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header />
      teste
      <Button onClick={() => setOpen(true)}>vai</Button>
      <DialogScreen setOpen={setOpen} open={open} title="Criação de Processo">
        <ProcessForm />
      </DialogScreen>
    </>
  );
}

export default App;
