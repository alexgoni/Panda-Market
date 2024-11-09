import classNames from "classnames/bind";
import ErrorBoundary from "components/Layout/ErrorBoundary";
import { Suspense } from "react";

import styles from "../../Product.module.scss";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const cx = classNames.bind(styles);

export default function CommentSection() {
  return (
    <div className={cx("comment-section-container")}>
      <ErrorBoundary fallback={<>asdf</>}>
        <Suspense>
          <CommentForm />
          <CommentList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
