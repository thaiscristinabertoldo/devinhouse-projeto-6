import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
} from "@material-ui/core";
import { Field } from "../Field/Field";
import * as Styled from "./ProcessAccordion.styled";

export const ProcessAccordion = ({
  process,
  onChangeDeleteProcessId,
  toggleIsEditing,
}) => {
  return (
    <>
      <Styled.Accordion>
        <AccordionSummary>
          <Styled.Typography
            className="keyProcess"
            color="primary"
            variant="h6"
          >
            {process.chaveProcesso}
          </Styled.Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Field
            title="Descrição do processo:"
            description={process.descricao}
          />
          <Divider />
          <Field
            className="matter"
            title="Assunto:"
            description={process.cdAssunto.descricao}
          />
          <Divider />
          <Field
            title="Interessado:"
            description={process.cdInteressado.nmInteressado}
            className="interested"
          />
          <AccordionActions>
            <Styled.Button
              onClick={() => onChangeDeleteProcessId(process.id)}
              size="normal"
            >
              Excluir
            </Styled.Button>
            <Button
              size="large"
              variant="outlined"
              onClick={() => toggleIsEditing(process)}
            >
              Editar
            </Button>
          </AccordionActions>
        </AccordionDetails>
      </Styled.Accordion>
    </>
  );
};
