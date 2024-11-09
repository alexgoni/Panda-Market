import type { Comment as CommentType } from "@panda-market-api";
import kebabIcon from "assets/icons/ic_kebab.svg";
import classNames from "classnames/bind";
import Profile from "components/Profile";
import { formatTimeAgo } from "utils/date";

import styles from "../../Product.module.scss";

const cx = classNames.bind(styles);

interface Props {
  data: CommentType;
}

export default function Comment({ data }: Props) {
  const {
    content,
    updatedAt,
    writer: { nickname, image },
  } = data;

  return (
    <div className={cx("comment-container")}>
      <div className={cx("content")}>
        <span>{content}</span>
        <img src={kebabIcon} alt="kebab" />
      </div>

      <div className={cx("profile-img-container")}>
        <Profile image={image} name={nickname} />
        <span className={cx("username")}>{nickname}</span>
        <span className={cx("updated-time")}>{formatTimeAgo(updatedAt)}</span>
      </div>
    </div>
  );
}
