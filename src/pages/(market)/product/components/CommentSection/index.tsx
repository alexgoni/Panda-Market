import classNames from "classnames/bind";
import { Suspense } from "react";

import styles from "../../Product.module.scss";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const cx = classNames.bind(styles);

export default function CommentSection() {
  return (
    <div className={cx("comment-section-container")}>
      <CommentForm />
      <Suspense>
        <CommentList />
      </Suspense>
    </div>
  );
}
