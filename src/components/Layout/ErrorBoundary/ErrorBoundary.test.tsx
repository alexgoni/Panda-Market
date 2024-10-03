import { render, screen } from "@testing-library/react";

import ErrorBoundary from ".";

describe("ErrorBoundary Component", () => {
  it("정상적인 컴포넌트", () => {
    function GoodComponent() {
      return <div>Good Component</div>;
    }

    render(
      <ErrorBoundary fallback={ErrorFallback}>
        <GoodComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Good Component")).toBeInTheDocument();
  });

  it("에러 컴포넌트", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    function BadComponent() {
      throw new Error("Test error");

      return null;
    }

    render(
      <ErrorBoundary fallback={ErrorFallback}>
        <BadComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("에러가 발생했습니다.")).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});

function ErrorFallback() {
  return <span>에러가 발생했습니다.</span>;
}
