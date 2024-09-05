import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import Pagination from ".";

describe("Pagination Component", () => {
  it("내부 page state 사용", () => {
    render(<Pagination totalPages={10} />);

    expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next/i })).not.toBeDisabled();
    expect(screen.getByText("1")).toHaveClass("active");
  });

  it("페이지 버튼 클릭", () => {
    const onPageChange = jest.fn();
    render(<Pagination totalPages={10} onPageChange={onPageChange} />);

    fireEvent.click(screen.getByText("3"));

    expect(onPageChange).toHaveBeenCalledWith(3);
    expect(screen.getByText("3")).toHaveClass("active");
  });

  it("next 버튼 클릭", () => {
    render(<Pagination totalPages={10} />);

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(screen.getByText("6")).toHaveClass("active");
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });

  it("prev 버튼 클릭", () => {
    function PaginationTestComponent() {
      const [page, setPage] = useState(7);

      const handlePageChange = (newPage: number) => {
        setPage(newPage);
      };

      return (
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={handlePageChange}
        />
      );
    }

    render(<PaginationTestComponent />);

    fireEvent.click(screen.getByRole("button", { name: /prev/i }));

    expect(screen.getByText("1")).toHaveClass("active");
    expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
  });

  it("초기값이 totalPages 보다 큰 경우", () => {
    function PaginationTestComponent() {
      const [page, setPage] = useState(12);

      const handlePageChange = (newPage: number) => {
        setPage(newPage);
      };

      return (
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={handlePageChange}
        />
      );
    }

    render(<PaginationTestComponent />);

    expect(screen.getByText("10")).toHaveClass("active");
  });

  it("초기값이 1보다 작은 경우", () => {
    function PaginationTestComponent() {
      const [page, setPage] = useState(0);

      const handlePageChange = (newPage: number) => {
        setPage(newPage);
      };

      return (
        <Pagination
          currentPage={page}
          totalPages={10}
          onPageChange={handlePageChange}
        />
      );
    }

    render(<PaginationTestComponent />);

    expect(screen.getByText("1")).toHaveClass("active");
  });
});
