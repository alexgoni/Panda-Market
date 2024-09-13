import { fireEvent, render, screen } from "@testing-library/react";

import Popover from ".";

describe("Popover Component", () => {
  it("trigger 클릭", () => {
    render(<PopoverTestComponent />);

    const triggerElement = screen.getByText("Trigger");
    fireEvent.click(triggerElement);

    expect(screen.queryByText("수정")).toBeInTheDocument();
    expect(screen.queryByText("삭제")).toBeInTheDocument();
  });

  it("useClickOutside 테스트", () => {
    render(<PopoverTestComponent />);

    const triggerElement = screen.getByText("Trigger");
    fireEvent.click(triggerElement);

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText("수정")).not.toBeInTheDocument();
  });
});

function PopoverTestComponent({
  position = "right",
}: {
  position?: "left" | "right";
}) {
  return (
    <Popover.Root>
      <Popover.Trigger>Trigger</Popover.Trigger>
      <Popover.Content position={position}>
        <>
          <div>수정</div>
          <div>삭제</div>
        </>
      </Popover.Content>
    </Popover.Root>
  );
}
