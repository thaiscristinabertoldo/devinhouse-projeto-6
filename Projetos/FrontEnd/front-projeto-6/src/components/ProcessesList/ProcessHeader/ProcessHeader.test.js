import { render, screen } from "@testing-library/react";
import { ProcessHeader } from "./ProcessHeader";

const renderComponent = () => render(<ProcessHeader />);

describe("ProcessHeader Component", () => {
  it("Deve renderizar o componente ProcessHeader", () => {
    renderComponent();

    const textField = screen.getByPlaceholderText("Buscar por chave");

    expect(textField).toBeInTheDocument;
  });

  it("Deve renderizar o botão de Novo", () => {
    renderComponent();

    const editButton = screen.getByRole("button", { name: /Novo/i });

    expect(editButton).toBeInTheDocument;
  });
});
