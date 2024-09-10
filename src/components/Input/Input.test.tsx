import { fireEvent, render, screen } from "@testing-library/react";
import Form from "components/Form";
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";

import Input from ".";

describe("Input Component", () => {
  describe("TextInput", () => {
    function TextInputComponent() {
      const [value, setValue] = useState("");

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };

      return (
        <Form>
          <Input
            type="text"
            name="text"
            value={value}
            required
            onChange={handleChange}
          />
        </Form>
      );
    }

    it("handleChange 테스트", () => {
      render(<TextInputComponent />);
      const inputElement = screen.getByRole("textbox");

      fireEvent.change(inputElement, { target: { value: "테스트 입력" } });

      expect(inputElement).toHaveValue("테스트 입력");
    });
  });

  describe("NumberInput", () => {
    function NumberInputComponent() {
      const [value, setValue] = useState(0);

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
      };

      return (
        <Form>
          <Input
            type="number"
            name="text"
            value={value}
            required
            onChange={handleChange}
          />
        </Form>
      );
    }

    it("handleChange 테스트", () => {
      render(<NumberInputComponent />);
      const inputElement = screen.getByRole("textbox");

      expect(inputElement).toHaveValue("");

      fireEvent.change(inputElement, { target: { value: "1234" } });
      expect(inputElement).toHaveValue("1,234");
    });
  });

  describe("EmailInput", () => {
    function EmailInputComponent() {
      const [value, setValue] = useState("");

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };

      return (
        <Form>
          <Input
            type="email"
            name="text"
            value={value}
            required
            onChange={handleChange}
          />
        </Form>
      );
    }

    it("유효하지 않은 이메일", () => {
      render(<EmailInputComponent />);

      const inputElement = screen.getByRole("textbox");
      fireEvent.change(inputElement, { target: { value: "invalid-email" } });

      expect(
        screen.getByText("유효하지 않은 이메일 형식입니다."),
      ).toBeInTheDocument();
    });

    it("유효한 이메일", () => {
      render(<EmailInputComponent />);

      const inputElement = screen.getByRole("textbox");
      fireEvent.change(inputElement, {
        target: { value: "valid@example.com" },
      });

      expect(screen.queryByText("유효하지 않은 이메일 형식입니다.")).toBeNull();
    });

    it("이메일 썼다가 지우기", () => {
      render(<EmailInputComponent />);

      const inputElement = screen.getByRole("textbox");

      fireEvent.change(inputElement, { target: { value: "invalid-email" } });
      expect(
        screen.getByText("유효하지 않은 이메일 형식입니다."),
      ).toBeInTheDocument();

      fireEvent.change(inputElement, { target: { value: "" } });
      expect(screen.queryByText("유효하지 않은 이메일 형식입니다.")).toBeNull();
    });
  });

  describe("PasswordInput", () => {
    function PasswordInputComponent() {
      const [formValue, setFormValue] = useState({
        password: "",
        passwordConfirmation: "",
      });

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormValue((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      return (
        <Form>
          <Input
            type="password"
            name="password"
            data-testid="password"
            value={formValue.password}
            onChange={handleChange}
            required
          />
          <Input
            type="password-confirmation"
            name="passwordConfirmation"
            data-testid="password-confirmation"
            password={formValue.password}
            value={formValue.passwordConfirmation}
            onChange={handleChange}
            required
          />
        </Form>
      );
    }

    it("icon toggle 테스트", () => {
      render(<PasswordInputComponent />);

      const inputElement = screen.getByTestId("password");
      const toggleButton = screen.getAllByRole("button")[0];

      expect(inputElement).toHaveAttribute("type", "password");

      fireEvent.click(toggleButton);
      expect(inputElement).toHaveAttribute("type", "text");

      fireEvent.click(toggleButton);
      expect(inputElement).toHaveAttribute("type", "password");
    });

    it("password validate 테스트", () => {
      render(<PasswordInputComponent />);

      const inputElement = screen.getByTestId("password");

      fireEvent.change(inputElement, { target: { value: "short" } });
      expect(
        screen.getByText("비밀번호를 8자 이상 입력해주세요."),
      ).toBeInTheDocument();

      fireEvent.change(inputElement, {
        target: { value: "longenoughpassword" },
      });
      expect(
        screen.queryByText("비밀번호를 8자 이상 입력해주세요."),
      ).toBeNull();
    });

    it("password confirmation 테스트", () => {
      render(<PasswordInputComponent />);

      const passwordInput = screen.getByTestId("password");
      const passwordConfirmationInput = screen.getByTestId(
        "password-confirmation",
      );
      fireEvent.change(passwordInput, { target: { value: "validpassword" } });

      fireEvent.change(passwordConfirmationInput, {
        target: { value: "short" },
      });
      expect(
        screen.getByText("비밀번호를 8자 이상 입력해주세요."),
      ).toBeInTheDocument();

      fireEvent.change(passwordConfirmationInput, {
        target: { value: "notsamepassword" },
      });
      expect(
        screen.getByText("비밀번호가 일치하지 않습니다."),
      ).toBeInTheDocument();

      fireEvent.change(passwordConfirmationInput, {
        target: { value: "validpassword" },
      });
      expect(
        screen.queryByText("비밀번호를 8자 이상 입력해주세요."),
      ).toBeNull();
      expect(screen.queryByText("비밀번호가 일치하지 않습니다.")).toBeNull();
    });
  });

  describe("TagInput", () => {
    function TagInputComponent() {
      const [tagList, setTagList] = useState<string[]>([]);

      const handleTagKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        setTagList((prev) => [...prev, e.currentTarget.value]);
      };

      const handleTagDelete = (target: string) => {
        setTagList((prev) => prev.filter((tag) => tag !== target));
      };

      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      };

      return (
        <Form onSubmit={handleSubmit}>
          <Input
            type="tag"
            name="tag"
            value={tagList}
            onKeyUp={handleTagKeyUp}
            onDelete={handleTagDelete}
            required
          />
        </Form>
      );
    }

    it("handleChange 테스트", () => {
      render(<TagInputComponent />);
      const inputElement = screen.getByRole("textbox");

      fireEvent.change(inputElement, { target: { value: "테스트 입력" } });

      expect(inputElement).toHaveValue("테스트 입력");
    });

    it("Enter key 테스트", () => {
      render(<TagInputComponent />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "new-tag" } });
      fireEvent.keyUp(input, { key: "Enter" });

      expect(screen.getByText("#new-tag")).toBeInTheDocument();
      expect(input).toHaveValue("");
    });

    it("중복 태그 테스트", () => {
      window.alert = jest.fn();
      render(<TagInputComponent />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "duplicate-tag" } });
      fireEvent.keyUp(input, { key: "Enter" });
      fireEvent.change(input, { target: { value: "duplicate-tag" } });
      fireEvent.keyUp(input, { key: "Enter" });

      expect(window.alert).toHaveBeenCalledWith("같은 태그가 있습니다.");
    });

    it("태그 제거 테스트", () => {
      render(<TagInputComponent />);

      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "tag-to-delete" } });
      fireEvent.keyUp(input, { key: "Enter" });

      const deleteButton = screen.getByLabelText("delete-icon");
      fireEvent.click(deleteButton);

      expect(screen.queryByText("tag-to-delete")).not.toBeInTheDocument();
    });
  });

  describe("SearchInput", () => {
    function SearchInputComponent() {
      const [value, setValue] = useState("");

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        // eslint-disable-next-line no-console
        console.log(e.target.value);
      };

      return (
        <Input
          type="search"
          value={value}
          onChange={handleChange}
          maxWidth="500px"
          required
        />
      );
    }

    it("handleChange 테스트", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      render(<SearchInputComponent />);

      const inputElement = screen.getByRole("textbox");

      fireEvent.change(inputElement, { target: { value: "search term" } });
      expect(inputElement).toHaveValue("search term");

      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith("search term");
      consoleSpy.mockRestore();
    });

    it("width 테스트", () => {
      const { container } = render(<SearchInputComponent />);

      const wrapperElement = container.querySelector("div");

      expect(wrapperElement).toHaveStyle("maxWidth: 500px");
    });
  });
});
