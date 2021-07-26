import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonWithIcon } from './ButtonWithIcon';

describe('Componente ButtonWithIcon', function () {
  test('Deve renderizar o componente corretamente', () => {
    render(<ButtonWithIcon />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('Deve renderizar corretamente a prop iconName', () => {
    render(<ButtonWithIcon iconName={'face'} />);
    expect(screen.getByText('face')).toBeInTheDocument();
  });

  test('Deve renderizar corretamente com a cor informada', () => {
    render(<ButtonWithIcon color="primary" />);
    expect(screen.getByRole('button')).toHaveClass('MuiIconButton-colorPrimary');
  });

  test('Deve chamar uma função quando clicado', () => {
    const mockFn = jest.fn();
    render(<ButtonWithIcon onClick={mockFn} />);
    userEvent.click(screen.getByRole('button'));
    expect(mockFn).toBeCalled();
  });
});
