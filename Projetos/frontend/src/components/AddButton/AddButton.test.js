import { AddButton } from './AddButton';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Add } from '@material-ui/icons';

describe('Componente AddButton', function () {
  test('Deve renderizar o componente corretamente', () => {
    render(<AddButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Deve renderizar corretamente com o texto informado como children', () => {
    const BotaoComTexto = () => <AddButton>Texto</AddButton>;
    render(<BotaoComTexto />);
    expect(screen.getByText('Texto')).toBeInTheDocument();
  });

  test('Deve chamar uma função quando clicado', () => {
    const mockFn = jest.fn();
    render(<AddButton onClick={mockFn} />);
    userEvent.click(screen.getByRole('button'));
    expect(mockFn).toBeCalled();
  });
});
