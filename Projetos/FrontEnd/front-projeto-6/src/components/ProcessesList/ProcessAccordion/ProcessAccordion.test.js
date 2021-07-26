import { render, screen } from "@testing-library/react";
import { ProcessAccordion } from "./ProcessAccordion";
import userEvent from "@testing-library/user-event";

const renderComponent = () =>
  render(
    <ProcessAccordion
      process={{
        chaveProcesso: "key",
        descricao: "description",
        cdAssunto: { descricao: "matterDescription" },
        cdInteressado: { nmInteressado: "interested" },
      }}
    />,
  );

describe("ProcessAccordion Component", () => {
  it("Deve renderizar o componente ProcessAccordion", () => {
    renderComponent();

    const accordionKey = screen.getByText("key");

    expect(accordionKey).toHaveClass("keyProcess");
  });

  it("Deve renderizar o campo descrição do processo", () => {
    renderComponent();

    const processDescription = screen.getByText("description");

    expect(processDescription).toBeInTheDocument;
  });

  it("Deve renderizar o campo de assunto", () => {
    renderComponent();

    const matterDescription = screen.getByText("matterDescription");

    expect(matterDescription).toBeInTheDocument;
  });

  it("Deve renderizar o campo de interessado", () => {
    renderComponent();

    const interestedName = screen.getByText("interested");

    expect(interestedName).toBeInTheDocument;
  });

  it("Deve renderizar o botão de excluir", () => {
    renderComponent();

    const accordionKey = screen.getByText("key");
    userEvent.click(accordionKey);

    const deleteButton = screen.getByRole("button", { name: /Excluir/i });

    expect(deleteButton).toBeInTheDocument;
  });

  it("Deve renderizar o botão de Editar", () => {
    renderComponent();

    const accordionKey = screen.getByText("key");
    userEvent.click(accordionKey);

    const editButton = screen.getByRole("button", { name: /Editar/i });

    expect(editButton).toBeInTheDocument;
  });
});
