import { Typography } from "@material-ui/core";
import * as Styled from "./Field.styled";

export const Field = ({ title, description }) => {
  return (
    <Styled.Box>
      <Styled.Typography className="FieldTitle">{title}</Styled.Typography>
      <Typography>{description}</Typography>
    </Styled.Box>
  );
};
