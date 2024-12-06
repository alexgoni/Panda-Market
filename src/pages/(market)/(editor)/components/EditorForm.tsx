import classNames from "classnames/bind";
import Button from "components/Button";
import Form from "components/Form";
import ImageUploader from "components/ImageUploader";
import Input from "components/Input";
import Textarea from "components/Textarea";
import { ChangeEvent, KeyboardEvent, useState } from "react";

import styles from "../Editor.module.scss";

const cx = classNames.bind(styles);

interface FormValue {
  image: File | null;
  name: string;
  description: string;
  price: number;
  tagList: string[];
}

// TODO: initial value
export default function EditorForm() {
  const [formValue, setFormValue] = useState<FormValue>({
    image: null,
    name: "",
    description: "",
    price: 0,
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
    const name = "image";

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

  return (
    <Form className={cx("form")}>
      <h1 className={cx("title")}>상품 등록하기</h1>
      <Button type="submit" height="40px" className={cx("submit-btn")}>
        등록
      </Button>

      <label htmlFor="image">상품 이미지</label>
      <ImageUploader
        id="image"
        name="image"
        onChange={handleImageChange}
        required
      />

      <label htmlFor="name">상품명</label>
      <Input
        type="text"
        name="name"
        value={formValue.name}
        onChange={handleChange}
        placeholder="상품명을 입력해주세요."
        required
      />

      <label htmlFor="description">상품 소개</label>
      <Textarea
        id="description"
        placeholder="상품소개를 입력해주세요"
        name="description"
        size="md"
        value={formValue.description}
        onChange={handleTextareaChange}
        required
      />

      <label htmlFor="price">판매 가격</label>
      <Input
        type="number"
        name="price"
        value={formValue.price}
        onChange={handleChange}
        placeholder="판매 가격을 입력해주세요"
        required
      />

      <label htmlFor="tag">태그</label>
      <Input
        id="tag"
        type="tag"
        value={formValue.tagList}
        name="tagList"
        required={false}
        onKeyUp={handleTagKeyUp}
        onDelete={handleTagDelete}
        placeholder="태그를 입력해주세요"
      />
    </Form>
  );
}
