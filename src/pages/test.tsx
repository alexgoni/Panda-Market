import { GetMyProductsResponse } from "@panda-market-api";
import Button from "components/Button";
import Form from "components/Form";
import ImageUploader from "components/ImageUploader";
import Input from "components/Input";
import Footer from "components/Layout/Footer";
import MainLayout from "components/Layout/MainLayout";
import Navbar from "components/Layout/Navbar";
import Pagination from "components/Pagination";
import Textarea from "components/Textarea";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

interface FormValue {
  nickname: string;
  price: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  textarea: string;
  imageUploader: File | null;
  tagList: string[];
}

export default function Test() {
  const [page, setPage] = useState(2);
  const [formValue, setFormValue] = useState<FormValue>({
    nickname: "",
    price: 0,
    email: "",
    password: "",
    passwordConfirmation: "",
    textarea: "",
    imageUploader: null,
    tagList: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File | null) => {
    const name = "imageUploader";

    setFormValue((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleTagKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const name = "tagList";

    setFormValue((prev) => ({
      ...prev,
      [name]: [...prev.tagList, e.currentTarget.value],
    }));
  };

  const handleTagDelete = (target: string) => {
    const name = "tagList";

    setFormValue((prev) => ({
      ...prev,
      [name]: prev[name].filter((tag: string) => tag !== target),
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch("/api/users");
  }, []);

  return (
    <>
      <Navbar />

      <MainLayout>
        <Button>판다마켓</Button>
        <Pagination
          totalPages={7}
          currentPage={page}
          onPageChange={handlePageChange}
        />
        <Form>
          <Input
            type="tag"
            value={formValue.tagList}
            name="tagList"
            required={false}
            onKeyUp={handleTagKeyUp}
            onDelete={handleTagDelete}
            placeholder="태그를 입력하세요"
          />
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
            name="price"
            value={formValue.price}
            onChange={handleChange}
            placeholder="가격"
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
            placeholder="비밀번호를 확인합시다"
            required
          />
          <Button type="submit">asdf</Button>
          <Textarea
            placeholder="asdf"
            name="textarea"
            size="sm"
            value={formValue.textarea}
            onChange={handleTextareaChange}
            required
          />
          <ImageUploader
            name="imageUploader"
            onChange={handleImageChange}
            required
          />
        </Form>
      </MainLayout>
      <Footer />
    </>
  );
}
