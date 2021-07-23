import { render, screen } from "@testing-library/react";
import AlertDialog from "./AlertDialog";

const renderComponent = () =>
  render(<AlertDialog open={true} title="title" description="description" />);

describe("AlertDialog Component", () => {
  it("Deve renderizar o componente alerta", () => {
    renderComponent();

    const DialogTitle = screen.getByText("title");

    expect(DialogTitle).toHaveClass("AlertTitle");
  });

  it("Deve renderizar o botão de voltar", () => {
    renderComponent();

    const BackButton = screen.getByRole("button", { name: /Voltar/i });

    expect(BackButton).toBeInTheDocument;
  });

  it("Deve renderizar o botão de Aceitar", () => {
    renderComponent();

    const AcceptButton = screen.getByRole("button", { name: /Aceitar/i });

    expect(AcceptButton).toBeInTheDocument;
  });

  it("Deve renderizar o texto da descrição do alerta", () => {
    renderComponent();

    const descriptionText = screen.getByText("description");

    expect(descriptionText).toBeInTheDocument;
  });
});
