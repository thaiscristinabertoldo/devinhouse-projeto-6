import { useViewport } from "context/Viewport";
import { Spacing } from "./Header.styled";
import { HeaderLarge } from "./HeaderLarge";
import { HeaderSmall } from "./HeaderSmall";

export const Header = () => {
  const { width } = useViewport();
  return (
    <>
      {width >= 640 ? <HeaderLarge /> : <HeaderSmall />}
      <Spacing />
    </>
  );
};
