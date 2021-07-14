import { BoxMenu } from "./HeaderMenu.styled";

export const HeaderMenu = ({ children, title, onClick }) => {
  return (
    <BoxMenu onClick={onClick}>
      {children}
      {title}
    </BoxMenu>
  );
};
