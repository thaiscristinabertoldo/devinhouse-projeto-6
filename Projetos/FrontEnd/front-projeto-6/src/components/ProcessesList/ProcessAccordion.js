import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Typography,
} from "@material-ui/core";
import { Field } from "./Field";

export const ProcessAccordion = ({ process, setAlertDialog }) => {
  return (
    <>
      <Accordion style={{ marginBottom: "8px" }}>
        <AccordionSummary>
          <Typography color="primary" variant="h6" sx={{ flexShrink: 0 }}>
            {process.chaveProcesso}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Field title="Descrição do processo:" desc={process.descricao} />
          <Divider />
          <Field title="Assunto:" desc={process.cdAssunto.descricao} />
          <Divider />
          <Field
            title="Interessado:"
            desc={process.cdInteressado.nmInteressado}
          />
          <AccordionActions>
            <Button
              onClick={() =>
                setAlertDialog((old) => ({
                  ...old,
                  id: process.id,
                  open: true,
                }))
              }
              size="normal"
              style={{ color: "red" }}
            >
              Excluir
            </Button>
            <Button size="large" variant="outlined">
              Editar
            </Button>
          </AccordionActions>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
