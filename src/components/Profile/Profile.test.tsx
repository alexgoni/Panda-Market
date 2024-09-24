import { render } from "@testing-library/react";

import Profile from ".";

describe("Profile Component", () => {
  it("size 테스트", () => {
    const { container } = render(<Profile name="alexgoni" size="sm" />);
    const profileElement = container.querySelector("div");

    expect(profileElement).toHaveClass("profile sm");
  });

  it("profile image 테스트", () => {
    const imgUrl = "https://example.com/profile.jpg";
    const { getByAltText } = render(<Profile name="alexgoni" image={imgUrl} />);
    const imageElement = getByAltText("profile");

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", imgUrl);
    expect(imageElement).toHaveStyle({ backgroundColor: "" });
  });

  it("이름에 따라 언제나 같은 색상 유지", () => {
    const { container } = render(<Profile name="alexgoni" />);
    const profileElement = container.querySelector("div");

    expect(profileElement).toHaveStyle({ backgroundColor: "##b4b497" });
  });
});
