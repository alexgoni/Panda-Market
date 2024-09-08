import { fireEvent, render, screen } from "@testing-library/react";

import Button from ".";

describe("Button Component", () => {
  it("기본 버튼 테스트", () => {
    render(<Button>Click Me</Button>);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Click Me");
  });

  it("onClick 테스트", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("round 테스트", () => {
    render(<Button round>Round Button</Button>);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveClass("round");
  });

  it("인라인 스타일 테스트", () => {
    render(<Button width="100%">Button</Button>);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveStyle({ width: "100%" });
  });
});