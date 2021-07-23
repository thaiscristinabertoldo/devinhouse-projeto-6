import { AddButton } from './AddButton';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Componente AddButton', function () {
  test('Deve renderizar o componente corretamente', () => {
    const { getByRole } = render(<AddButton />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  test('Deve chamar uma função quando clicado', () => {
    const mockFn = jest.fn();
    const { getByRole } = render(<AddButton onClick={mockFn} />);
    fireEvent.click(getByRole('button'));
    expect(mockFn).toBeCalled();
  });
});
