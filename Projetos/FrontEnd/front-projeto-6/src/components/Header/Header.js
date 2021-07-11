import { useState } from 'react';
import { Typography } from '@material-ui/core';
import Lottie from 'react-lottie';
import animationData from './Animation.json';
import {
  StyledHeader,
  Spacing,
  AnimationButton,
  AnimationGrid,
} from './Header.styled';

export function Header() {
  const [animationDarkMode, setAnimationDarkMode] = useState({
    isStopped: true,
    isPaused: false,
    direction: -1,
  });
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <StyledHeader>
        <Typography>Jboys - Consulta de Processos</Typography>
        <AnimationButton
          onClick={() => {
            const reverseAnimation = -1;
            const normalAnimation = 1;
            setAnimationDarkMode({
              ...animationDarkMode,
              isStopped: false,
              direction:
                animationDarkMode.direction === normalAnimation
                  ? reverseAnimation
                  : normalAnimation,
            });
          }}
        >
          <AnimationGrid>
            <Lottie
              options={defaultOptions}
              height={50}
              width={50}
              direction={animationDarkMode.direction}
              isStopped={animationDarkMode.isStopped}
              isPaused={animationDarkMode.isPaused}
            />
          </AnimationGrid>
        </AnimationButton>
      </StyledHeader>
      <Spacing />
    </>
  );
}
