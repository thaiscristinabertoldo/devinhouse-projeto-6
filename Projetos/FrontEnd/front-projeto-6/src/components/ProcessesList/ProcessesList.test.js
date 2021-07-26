import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProcessesList } from "./ProcessesList";

const renderComponent = () => render(<ProcessesList />);

describe("ProcessesList Component", () => {
  it("Deve renderizar o componente ProcessesList sem processos", () => {
    renderComponent();

    const processesList = screen.getByText("Não temos nenhum processo criado, que tal criar um?");

    expect(processesList).toBeInTheDocument;
  });

  it("Deve renderizar o botão de NOVO", () => {
    renderComponent();

    const newButton = screen.getByRole("button", { name: /Novo/i });

    expect(newButton).toBeInTheDocument;
  });
});
