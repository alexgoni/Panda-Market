import classNames from "classnames/bind";
import Button from "components/Button";
import Form from "components/Form";
import Textarea from "components/Textarea";
import { ChangeEvent, FormEvent, useState } from "react";

import styles from "../../Product.module.scss";
import useCommentAction from "./hooks/useCommentAction";

const cx = classNames.bind(styles);

interface Props {
  commentId: number;
  initialValue: string;
  handleEditMode: (newEditMode: boolean) => void;
}

export default function EditForm({
  commentId,
  initialValue,
  handleEditMode,
}: Props) {
  const [value, setValue] = useState(initialValue);
  const { editMutation } = useCommentAction("edit", { commentId, text: value });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditMode(false);
    editMutation.mutate();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea
        value={value}
        name="content"
        onChange={handleChange}
        size="sm"
        required
      />

      <div className={cx("btn-container")}>
        <Button
          type="button"
          width="80px"
          height="40px"
          className={cx("edit-cancel-btn")}
          onClick={() => handleEditMode(false)}
        >
          취소
        </Button>
        <Button type="submit" width="80px" height="40px">
          수정
        </Button>
      </div>
    </Form>
  );
}
