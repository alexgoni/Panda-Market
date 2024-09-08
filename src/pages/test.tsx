import Button from "components/Button";
import Form from "components/Form";
import Input from "components/Input";
import Pagination from "components/Pagination";
import Textarea from "components/Textarea";
import { ChangeEvent, useEffect, useState } from "react";

export default function Test() {
  const [page, setPage] = useState(2);
  const [formValue, setFormValue] = useState({
    nickname: "",
    price: 0,
    email: "",
    password: "",
    passwordConfirmation: "",
    textarea: "",
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch("/api/users");
  }, []);

  return (
    <>
      <Button>판다마켓</Button>
      <Pagination
        totalPages={7}
        currentPage={page}
        onPageChange={handlePageChange}
      />
      <Form>
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
        />
        <Input
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
        />
        <Input
          type="password-confirmation"
          name="passwordConfirmation"
          value={formValue.passwordConfirmation}
          onChange={handleChange}
          password={formValue.password}
          placeholder="비밀번호를 확인합시다"
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
      </Form>

      {/* <Input
        type="password"
        value=""
        onChange={handleChange}
        placeholder="asfd"
        name="asdf"
      />
      <Input
        type="search"
        value=""
        onChange={handleChange}
        placeholder="asdfsdf"
        maxWidth="500px"
      /> */}
    </>
  );
}
