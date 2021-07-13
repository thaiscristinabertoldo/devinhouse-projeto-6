import { styled } from "@material-ui/core/styles";

const AnimationButton = styled("button")({
  width: "40px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "33px",
  backgroundColor: "transparent",
  border: "0",
  padding: "0",
  cursor: "pointer",
  outline: "0",
  borderRadius: "100%",
});

const AnimationGrid = styled("div")({
  pointerEvents: "none",
});

export { AnimationButton, AnimationGrid };
