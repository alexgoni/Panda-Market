/* eslint-disable react/jsx-no-useless-fragment */
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductComments } from "api/comment";
import inquiryEmpty from "assets/images/Img_inquiry_empty.png";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";

import styles from "../../Product.module.scss";
import Comment from "./Comment";

const cx = classNames.bind(styles);

// TODO: useInfiniteSuspenseQuery

export default function CommentList() {
  const { id } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: ["comments", id],
    queryFn: () => {
      if (!id) throw new Error("해당 상품이 존재하지 않습니다.");
      return getProductComments({ productId: Number(id), limit: 20 });
    },
  });

  return (
    <>
      {data.list.length > 0 ? (
        <div className={cx("comment-list-container")}>
          {data.list.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
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
