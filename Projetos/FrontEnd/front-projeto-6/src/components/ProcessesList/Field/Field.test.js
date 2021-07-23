import { render, screen } from "@testing-library/react";
import { Field } from "./Field";

const renderComponent = () =>
  render(<Field title="title" description="description" />);

describe("Field Component", () => {
  it("Deve renderizar o componente Field", () => {
    renderComponent();

    const FieldTitle = screen.getByText("title");

    expect(FieldTitle).toHaveClass("FieldTitle");
  });

  it("Deve renderizar o texto da descrição do Field", () => {
    renderComponent();

    const descriptionField = screen.getByText("description");

    expect(descriptionField).toBeInTheDocument;
  });
});
