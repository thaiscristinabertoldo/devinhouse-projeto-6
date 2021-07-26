import { render, screen } from '@testing-library/react';
import { Section, SectionTitle } from './Section';

describe('Componente Section e SectionTitle', () => {
  test('Deve renderizar o componente Section corretamente', () => {
    render(<Section />);
    expect(screen.getByTestId('custom-section')).toBeInTheDocument();
  });

  test('Deve renderizar o componente Section com o Paper quando passado via prop', () => {
    render(<Section paper />);
    expect(screen.getByTestId('custom-section')).toHaveClass('MuiPaper-root');
  });

  test('Deve renderizar o children do Section corretamente', () => {
    const SectionWithChildren = () => <Section>Hello</Section>;
    render(<SectionWithChildren />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  test('Deve renderizar o componente SectionTitle corretamente', () => {
    render(<SectionTitle />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  test('Deve renderizar o componente SectionTitle com divider', () => {
    render(<SectionTitle noDivider={false} />);
    expect(screen.getByTestId('divider')).toBeInTheDocument();
    expect(screen.getByTestId('divider')).toHaveClass('MuiDivider-root');
  });

  test('Deve renderizar o children do SectionTitle corretamente', () => {
    const SectionTitleWithChildren = () => <SectionTitle>Hello</SectionTitle>;
    render(<SectionTitleWithChildren />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
