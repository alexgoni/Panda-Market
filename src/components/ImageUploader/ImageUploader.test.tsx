import { fireEvent, render, screen } from "@testing-library/react";
import Button from "components/Button";
import Form from "components/Form";
import { useState } from "react";

import ImageUploader from ".";

describe("ImageUploader Component", () => {
  beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => "mocked-preview-url");
    global.URL.revokeObjectURL = jest.fn();
  });

  it("default UI", () => {
    render(<ImageUploaderComponent />);

    expect(screen.getByText("이미지 등록")).toBeInTheDocument();
    expect(screen.getByAltText("plus-icon")).toBeInTheDocument();
  });

  it("클릭 테스트", () => {
    const { container } = render(<ImageUploaderComponent />);

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const uploadButton = screen.getByRole("button", {
      name: /image-uploader/i,
    });
    fireEvent.click(uploadButton);

    expect(input).toBeInTheDocument();
    expect(input?.files?.length).toBe(0);
  });

  it("파일 업로드 테스트", () => {
    const { container } = render(<ImageUploaderComponent />);

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(input.files?.[0]).toBe(file);
    expect(input.files).toHaveLength(1);
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it("defaultValue로 preview image 렌더링 테스트", () => {
    const defaultImageUrl = "http://example.com/example.png";
    render(<ImageUploaderComponent defaultValue={defaultImageUrl} />);

    const previewImage = screen.getByAltText("preview");
    expect(previewImage).toBeInTheDocument();
    expect(previewImage).toHaveAttribute("src", defaultImageUrl);
  });

  it("이미지 삭제 테스트", () => {
    const defaultImageUrl = "http://example.com/example.png";
    const { container } = render(
      <ImageUploaderComponent defaultValue={defaultImageUrl} />,
    );

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const previewImage = screen.getByAltText("preview");
    const deleteButton = screen.getByRole("button", { name: /delete-icon/i });

    fireEvent.click(deleteButton);

    expect(previewImage).not.toBeInTheDocument();
    expect(input.value).toBe("");
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(defaultImageUrl);
  });

  it("validation 테스트", () => {
    const { container } = render(<ImageUploaderComponent />);

    const buttonElement = screen.getByText("제출");
    expect(buttonElement).toBeDisabled();

    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(buttonElement).not.toBeDisabled();
  });
});

function ImageUploaderComponent({ defaultValue }: { defaultValue?: string }) {
  const [, setFile] = useState<File | null>(null);

  const handleChange = (newFile: File | null) => {
    setFile(newFile);
  };

  return (
    <Form>
      <ImageUploader
        name="imageUploader"
        onChange={handleChange}
        defaultValue={defaultValue}
        required
      />
      <Button type="submit">제출</Button>
    </Form>
  );
}
