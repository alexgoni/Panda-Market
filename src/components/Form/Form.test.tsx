import { fireEvent, render, screen } from "@testing-library/react";
import Button from "components/Button";
import Input from "components/Input";
import { ChangeEvent, FormEvent, useState } from "react";

import Form from ".";

describe("Form Component", () => {
  function FormComponent() {
    const [formValue, setFormValue] = useState({
      nickname: "",
      age: 0,
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormValue((prev) => ({
        ...prev,
        [name]: name === "age" ? Number(value) : value,
      }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(formValue);
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nickname"
          value={formValue.nickname}
          onChange={handleChange}
          placeholder="이름"
          required
        />
        <Input
          type="number"
          name="age"
          value={formValue.age}
          onChange={handleChange}
          placeholder="나이"
          required
        />
        <Input
          type="email"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
          required
        />
        <Input
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
          required
        />
        <Input
          type="password-confirmation"
          name="passwordConfirmation"
          value={formValue.passwordConfirmation}
          onChange={handleChange}
          password={formValue.password}
          placeholder="비밀번호를 입력하세요"
          required
        />
        <Button type="submit">제출</Button>
      </Form>
    );
  }

  let consoleSpy: jest.SpyInstance;
  let buttonElement: HTMLElement;
  let nameInputElement: HTMLElement;
  let ageInputElement: HTMLElement;
  let emailInputElement: HTMLElement;
  let passwordInputElement: HTMLElement;
  let passwordConfirmationElement: HTMLElement;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<FormComponent />);

    nameInputElement = screen.getByPlaceholderText("이름");
    ageInputElement = screen.getByPlaceholderText("나이");
    emailInputElement = screen.getByPlaceholderText("이메일을 입력하세요");
    [passwordInputElement, passwordConfirmationElement] =
      screen.getAllByPlaceholderText("비밀번호를 입력하세요");
    buttonElement = screen.getByText("제출");

    fireEvent.change(nameInputElement, { target: { value: "John" } });
    fireEvent.change(ageInputElement, { target: { value: "30" } });
    fireEvent.change(emailInputElement, {
      target: { value: "john@example.com" },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: "password123" },
    });
    fireEvent.change(passwordConfirmationElement, {
      target: { value: "password123" },
    });
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("handleSubmit 테스트", () => {
    fireEvent.click(buttonElement);

    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith({
      nickname: "John",
      age: 30,
      email: "john@example.com",
      password: "password123",
      passwordConfirmation: "password123",
    });
  });

  describe("submit disabled 테스트", () => {
    it("name", () => {
      fireEvent.change(nameInputElement, {
        target: { value: "" },
      });
      expect(buttonElement).toBeDisabled();
    });

    it("age", () => {
      fireEvent.change(ageInputElement, {
        target: { value: "" },
      });
      expect(buttonElement).toBeDisabled();
    });

    it("email", () => {
      fireEvent.change(emailInputElement, {
        target: { value: "invalid-email" },
      });
      expect(buttonElement).toBeDisabled();
    });

    it("password", () => {
      fireEvent.change(passwordInputElement, {
        target: { value: "short" },
      });
      fireEvent.change(passwordConfirmationElement, {
        target: { value: "short" },
      });
      expect(buttonElement).toBeDisabled();
    });

    it("password-confirmation", () => {
      fireEvent.change(passwordConfirmationElement, {
        target: { value: "password12" },
      });
      expect(buttonElement).toBeDisabled();
    });
  });
});
