import { AppBar } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const headerHeight = 6;

const StyledHeader = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.main,
  height: theme.spacing(headerHeight),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));

const Spacing = styled('div')(({ theme }) => ({
  height: theme.spacing(headerHeight),
}));

const AnimationButton = styled('button')(({ theme }) => ({
  width: '40px',
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '33px',
  backgroundColor: 'transparent',
  border: '0',
  padding: '0',
  cursor: 'pointer',
  outline: '0',
  borderRadius: '100%',
}));

const AnimationGrid = styled('div')(({ theme }) => ({
  pointerEvents: 'none',
}));

export { StyledHeader, Spacing, AnimationButton, AnimationGrid };
