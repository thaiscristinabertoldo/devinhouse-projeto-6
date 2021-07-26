import { render, screen } from '@testing-library/react';
import { Pre } from './Pre';

describe('Componente Pre', () => {
  test('Renderiza o componente Pre corretamente', () => {
    render(<Pre />);
    expect(screen.getByTestId('custom-pre')).toBeInTheDocument();
  });

  test('Renderiza o children do Pre corretamente', () => {
    const PreWithChildren = () => <Pre>Hello</Pre>;
    render(<PreWithChildren />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
