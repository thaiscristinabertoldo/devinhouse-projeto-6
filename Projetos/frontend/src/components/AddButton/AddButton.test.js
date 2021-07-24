import { AddButton } from './AddButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Componente AddButton', function () {
  test('Deve renderizar o componente corretamente', () => {
    render(<AddButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Deve chamar uma função quando clicado', () => {
    const mockFn = jest.fn();
    render(<AddButton onClick={mockFn} />);
    userEvent.click(screen.getByRole('button'));
    expect(mockFn).toBeCalled();
  });
});
