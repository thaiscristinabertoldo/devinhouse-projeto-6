import { render, screen } from '@testing-library/react';
import { Grid, GridItem } from './Grid';

describe('Componente Grid e GridItem', () => {
  test('Deve renderizar o componente Grid corretamente', () => {
    render(<Grid />);
    expect(screen.getByTestId('custom-grid')).toBeInTheDocument();
  });

  test('Deve renderizar os childrens do Grid corretamente', () => {
    const GridWithChild = () => <Grid>Hello</Grid>;
    render(<GridWithChild />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('Deve renderizar o componente GridItem corretamente', () => {
    render(<GridItem />);
    expect(screen.getByTestId('custom-grid-item')).toBeInTheDocument();
  });

  test('Deve renderizar  os childrens GridItem corretamente', () => {
    const GridItemWithChild = () => <GridItem>Hello</GridItem>;
    render(<GridItemWithChild />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
