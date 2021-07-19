import { useState } from "react";
import { Button } from "@material-ui/core";
import { Header, ProcessForm } from "./components";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header />
      teste
      <Button onClick={() => setOpen(true)}>vai</Button>
      <ProcessForm setOpen={setOpen} open={open} />
    </>
  );
}

export default App;
