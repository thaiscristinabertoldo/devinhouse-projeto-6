import { useEffect, useState } from "react";
import { useThemes } from "context/theme";
import Lottie from "react-lottie";
import animationData from "./Animation.json";
import { AnimationButton, AnimationGrid } from "./ThemeAnimation.styled";

export const ThemeAnimation = () => {
  const { ToggleTheme, darkMode } = useThemes();
  const [animationDarkMode, setAnimationDarkMode] = useState({
    isStopped: true,
    isPaused: false,
    direction: 1,
  });
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    const reverseAnimation = -1;
    const normalAnimation = 1;
    setAnimationDarkMode((state) => {
      return {
        ...state,
        isStopped: false,
        direction:
          state.direction === normalAnimation
            ? reverseAnimation
            : normalAnimation,
      };
    });
  }, [darkMode]);
  return (
    <>
      <AnimationButton onClick={ToggleTheme}>
        <AnimationGrid>
          <Lottie
            options={defaultOptions}
            height={50}
            width={50}
            speed={2}
            direction={animationDarkMode.direction}
            isStopped={animationDarkMode.isStopped}
            isPaused={animationDarkMode.isPaused}
          />
        </AnimationGrid>
      </AnimationButton>
    </>
  );
};
