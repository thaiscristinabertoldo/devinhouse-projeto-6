import { useState } from "react";
import { Button } from "@material-ui/core";
import { Modal } from "components/Modal/Modal";
import { Header } from "./components";

function App() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Header />
      teste
      <Button onClick={handleClickOpen}>vai</Button>
      <Modal
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
}

export default App;
