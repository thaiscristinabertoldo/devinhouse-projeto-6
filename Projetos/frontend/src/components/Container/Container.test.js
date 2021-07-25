import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Componente Container', function () {
  test('Deve renderizar o componente corretamente', () => {
    render(<Container />);
    expect(screen.getByTestId('custom-container')).toBeInTheDocument();
  });

  test('Deve renderizar os childrens corretamente', () => {
    const ContainerWithChildren = () => <Container>Hello</Container>;
    render(<ContainerWithChildren />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
