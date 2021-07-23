import { Typography } from "@material-ui/core";
import * as Styled from "./ProcessesList.styled";

export const Field = ({ title, desc }) => {
  return (
    <Styled.BOXFIELD>
      <Typography>
        <b>{title}</b>
      </Typography>
      <Typography>{desc}</Typography>
    </Styled.BOXFIELD>
  );
};
