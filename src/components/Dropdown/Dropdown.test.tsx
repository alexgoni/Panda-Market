import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";

import Dropdown from ".";

describe("Dropdown Component", () => {
  it("first render", () => {
    render(<DropdownTestComponent />);

    const triggerElement = screen.getByLabelText("trigger");

    expect(triggerElement).toHaveTextContent("최신순");
    expect(screen.queryByText("좋아요순")).not.toBeInTheDocument();
  });

  it("trigger 클릭", () => {
    render(<DropdownTestComponent />);

    const triggerElement = screen.getByLabelText("trigger");
    fireEvent.click(triggerElement);

    expect(screen.queryByText("좋아요순")).toBeInTheDocument();
  });

  it("좋아요순 클릭", () => {
    render(<DropdownTestComponent />);

    const triggerElement = screen.getByLabelText("trigger");
    fireEvent.click(triggerElement);

    const orderByLikeOption = screen.getByText("좋아요순");
    fireEvent.click(orderByLikeOption);

    expect(triggerElement).toHaveTextContent("좋아요순");
  });

  it("useClickOutside 테스트", () => {
    render(<DropdownTestComponent />);

    const triggerElement = screen.getByLabelText("trigger");
    fireEvent.click(triggerElement);

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText("좋아요순")).not.toBeInTheDocument();
  });

  beforeEach(() => {
    jest
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockImplementation(() => ({
        width: 200,
        height: 40,
        x: 0,
        y: 0,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        toJSON: () => ({
          width: 200,
          height: 40,
          x: 0,
          y: 0,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }),
      }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("position center 테스트", async () => {
    render(<DropdownTestComponent position="center" />);

    const triggerElement = screen.getByLabelText("trigger");
    fireEvent.click(triggerElement);

    const listElement = await waitFor(() => screen.getByRole("list"));

    expect(listElement).toHaveStyle({
      width: "200px",
      top: "48px",
    });
  });

  it("position left 테스트", async () => {
    render(<DropdownTestComponent position="left" />);

    const triggerElement = screen.getByLabelText("trigger");
    fireEvent.click(triggerElement);

    const listElement = await waitFor(() => screen.getByRole("list"));

    expect(listElement).toHaveStyle({
      width: "100px",
      top: "48px",
      left: "0px",
    });
  });

  it("position right 테스트", async () => {
    render(<DropdownTestComponent position="right" />);

    const triggerElement = screen.getByLabelText("trigger");
    fireEvent.click(triggerElement);

    const listElement = await waitFor(() => screen.getByRole("list"));

    expect(listElement).toHaveStyle({
      width: "100px",
      top: "48px",
      right: "0px",
    });
  });
});

function DropdownTestComponent({
  position = "center",
}: {
  position?: "left" | "center" | "right";
}) {
  const [orderBy, setOrderBy] = useState("최신순");

  const handleOrderChange = (newOrder: string) => {
    setOrderBy(newOrder);
  };

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        {({ toggle }) => (
          <button
            type="button"
            onClick={toggle}
            aria-label="trigger"
            style={{ width: "200px", height: "40px" }}
          >
            {orderBy}
          </button>
        )}
      </Dropdown.Trigger>

      <Dropdown.List position={position} width="100px">
        <Dropdown.Option
          onClick={() => {
            handleOrderChange("최신순");
          }}
        >
          최신순
        </Dropdown.Option>
        <Dropdown.Option
          onClick={() => {
            handleOrderChange("좋아요순");
          }}
        >
          좋아요순
        </Dropdown.Option>
      </Dropdown.List>
    </Dropdown.Root>
  );
}
