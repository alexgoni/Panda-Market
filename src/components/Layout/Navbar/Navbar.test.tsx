import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UserProvider from "context/user";
import { MemoryRouter as Router } from "react-router-dom";

import Navbar from ".";

describe("Navbar component", () => {
  it("링크 테스트", () => {
    render(
      <Router>
        <UserProvider>
          <Navbar />
        </UserProvider>
      </Router>,
    );
    const boardLink = screen.getByText("자유게시판");
    const marketLink = screen.getByText("중고마켓");

    expect(boardLink).toBeInTheDocument();
    expect(boardLink).toHaveAttribute("href", "/board");

    expect(marketLink).toBeInTheDocument();
    expect(marketLink).toHaveAttribute("href", "/market");
  });

  it("로그인 버튼 테스트", () => {
    render(
      <Router>
        <UserProvider>
          <Navbar />
        </UserProvider>
      </Router>,
    );
    const loginButton = screen.getByRole("button", { name: /로그인/i });
    expect(loginButton).toBeInTheDocument();
  });
});
