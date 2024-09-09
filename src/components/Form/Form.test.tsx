/* eslint-disable no-console */
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "components/Button";
import Input from "components/Input";
import Textarea from "components/Textarea";
import { ChangeEvent, FormEvent, useState } from "react";

import Form, { useFormContext } from ".";

describe("Form Component", () => {
  it("useFormContext 호출 범위 테스트", () => {
    const originalError = console.error;
    console.error = jest.fn();

    function TestComponent() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const context = useFormContext();
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <></>;
    }

    expect(() => render(<TestComponent />)).toThrow(
      "Form 컨텍스트를 호출할 수 없는 범위입니다.",
    );

    console.error = originalError;
  });

  let consoleSpy: jest.SpyInstance;

  let nameInputElement: HTMLElement;
  let ageInputElement: HTMLElement;
  let emailInputElement: HTMLElement;
  let passwordInputElement: HTMLElement;
  let passwordConfirmationElement: HTMLElement;
  let descriptionElement: HTMLElement;
  let buttonElement: HTMLElement;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
    render(<FormComponent />);

    nameInputElement = screen.getByPlaceholderText("이름");
    ageInputElement = screen.getByPlaceholderText("나이");
    emailInputElement = screen.getByPlaceholderText("이메일을 입력하세요");
    [passwordInputElement, passwordConfirmationElement] =
      screen.getAllByPlaceholderText("비밀번호를 입력하세요");
    descriptionElement = screen.getByPlaceholderText("설명");
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
    fireEvent.change(descriptionElement, {
      target: { value: "설명입니다." },
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
      description: "설명입니다.",
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

    it("description", () => {
      fireEvent.change(descriptionElement, {
        target: { value: "" },
      });
      expect(buttonElement).toBeDisabled();
    });
  });
});

function FormComponent() {
  const [formValue, setFormValue] = useState({
    nickname: "",
    age: 0,
    email: "",
    password: "",
    passwordConfirmation: "",
    description: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(formValue);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="nickname"
        value={formValue.nickname}
        onChange={handleInputChange}
        placeholder="이름"
        required
      />
      <Input
        type="number"
        name="age"
        value={formValue.age}
        onChange={handleInputChange}
        placeholder="나이"
        required
      />
      <Input
        type="email"
        name="email"
        value={formValue.email}
        onChange={handleInputChange}
        placeholder="이메일을 입력하세요"
        required
      />
      <Input
        type="password"
        name="password"
        value={formValue.password}
        onChange={handleInputChange}
        placeholder="비밀번호를 입력하세요"
        required
      />
      <Input
        type="password-confirmation"
        name="passwordConfirmation"
        value={formValue.passwordConfirmation}
        onChange={handleInputChange}
        password={formValue.password}
        placeholder="비밀번호를 입력하세요"
        required
      />
      <Textarea
        placeholder="설명"
        name="description"
        value={formValue.description}
        onChange={handleTextareaChange}
        required
      />
      <Button type="submit">제출</Button>
    </Form>
  );
}
