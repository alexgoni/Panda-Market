import classNames from "classnames/bind";
import { useUserContext } from "context/user";
import { Suspense } from "react";

import styles from "../../Product.module.scss";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const cx = classNames.bind(styles);

export default function CommentSection() {
  const { userInfo } = useUserContext();

  return (
    <div className={cx("comment-section-container")}>
      {userInfo && <CommentForm userInfo={userInfo} />}
      <Suspense>
        <CommentList />
      </Suspense>
    </div>
  );
}
