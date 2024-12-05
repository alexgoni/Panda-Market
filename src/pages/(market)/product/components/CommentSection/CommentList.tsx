/* eslint-disable react/jsx-no-useless-fragment */
import inquiryEmpty from "assets/images/Img_inquiry_empty.png";
import classNames from "classnames/bind";
import { useRef } from "react";

import styles from "../../Product.module.scss";
import Comment from "./Comment";
import useGetCommentList from "./hooks/useGetCommentList";

const cx = classNames.bind(styles);

export default function CommentList() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const comments = useGetCommentList(sentinelRef);

  return (
    <>
      {comments.length > 0 ? (
        <div className={cx("comment-list-container")}>
          {comments.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
          <div ref={sentinelRef} className={cx("sentinel")} />
        </div>
      ) : (
        <div className={cx("empty-comment-container")}>
          <img src={inquiryEmpty} alt="inquiry-img" />
          <span>아직 문의가 없습니다.</span>
        </div>
      )}
    </>
  );
}
