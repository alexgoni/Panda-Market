import classNames from "classnames/bind";
import Button from "components/Button";
import Form from "components/Form";
import ImageUploader from "components/ImageUploader";
import Input from "components/Input";
import Textarea from "components/Textarea";

import styles from "../Editor.module.scss";
import useFormController from "../hooks/useFormController";
import type { FormValue } from "../type";

const cx = classNames.bind(styles);

interface Props {
  initialValue?: FormValue;
}

export default function EditorForm({ initialValue }: Props) {
  const {
    formValue,
    mutation,
    handleImageChange,
    handleInputChange,
    handleTextareaChange,
    handleTagDelete,
    handleTagKeyUp,
    handleSubmit,
    handleFormKeyDown,
  } = useFormController(initialValue);

  return (
    <Form
      onSubmit={handleSubmit}
      className={cx("form")}
      onKeyDown={handleFormKeyDown}
    >
      <h1 className={cx("title")}>상품 등록하기</h1>
      <Button
        type="submit"
        height="40px"
        disabled={mutation.isPending}
        className={cx("submit-btn")}
      >
        {!initialValue ? (
          <span>{!mutation.isPending ? "등록" : "등록 중"}</span>
        ) : (
          <span>{!mutation.isPending ? "수정" : "수정 중"}</span>
        )}
      </Button>

      <label htmlFor="image">상품 이미지</label>
      <ImageUploader
        id="image"
        name="image"
        onChange={handleImageChange}
        defaultValue={(initialValue?.image as string | null) ?? undefined}
        required
      />

      <label htmlFor="name">상품명</label>
      <Input
        type="text"
        name="name"
        value={formValue.name}
        onChange={handleInputChange}
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
        onChange={handleInputChange}
        placeholder="판매 가격을 입력해주세요"
        required
      />

      <label htmlFor="tag">태그</label>
      <Input
        id="tag"
        type="tag"
        value={formValue.tags}
        name="tags"
        required={false}
        onKeyUp={handleTagKeyUp}
        onDelete={handleTagDelete}
        placeholder="태그를 입력해주세요"
      />
    </Form>
  );
}
