import { Select } from '@material-ui/core';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Selector, SelectorGroup } from './Selector';

describe('Componente Selector e SelectorGroup', () => {
  test('Deve renderizar o Selector corretamente', () => {
    render(<Selector />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  test('Deve renderizar o Selector com o label corretamente', () => {
    render(<Selector label="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('Deve renderizar marcar o checkbox quando clicado', () => {
    render(<Selector />);
    const radio = screen.getByRole('radio');
    fireEvent.change(radio, { target: { value: 'selecionado' } });
    expect(radio.value).toBe('selecionado');
  });

  test('Deve renderizar o SelectorGroup corretamente', () => {
    render(<SelectorGroup />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });
});
