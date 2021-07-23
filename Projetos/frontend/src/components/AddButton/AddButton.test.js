import { AddButton } from './AddButton';
import { render, screen } from '@testing-library/react';

describe('Componente AddButton', function () {
  test('Deve renderizar o componente corretamente', () => {
    render(<AddButton />);
    screen.debug();
  });
});
