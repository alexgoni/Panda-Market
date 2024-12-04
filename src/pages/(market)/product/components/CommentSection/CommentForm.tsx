import classNames from "classnames/bind";
import Button from "components/Button";
import Form from "components/Form";
import Textarea from "components/Textarea";
import type { UserInfo } from "context/user";
import { ChangeEvent, FormEvent, useState } from "react";

import styles from "../../Product.module.scss";
import useCommentAction from "./hooks/useCommentAction";

const cx = classNames.bind(styles);

const PRIVACY_POLICY_NOTICE =
  "개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.";

export default function CommentForm({ userInfo }: { userInfo: UserInfo }) {
  const [text, setText] = useState("");
  const mutation = useCommentAction({ text, userInfo });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <>
      <h1 className={cx("title")}>문의하기</h1>
      <Form onSubmit={handleSubmit}>
        <Textarea
          name="comment"
          value={text}
          onChange={handleChange}
          size="sm"
          placeholder={PRIVACY_POLICY_NOTICE}
          required
        />

        <Button type="submit" className={cx("submit-btn")}>
          등록
        </Button>
      </Form>
    </>
  );
}
