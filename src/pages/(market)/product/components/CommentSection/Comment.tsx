import type { Comment as CommentType } from "@panda-market-api";
import classNames from "classnames/bind";
import Profile from "components/Profile";
import { useUserContext } from "context/user";
import { useState } from "react";
import { formatTimeAgo } from "utils/date";

import styles from "../../Product.module.scss";
import EditForm from "./EditForm";
import UpdatePopover from "./UpdatePopover";

const cx = classNames.bind(styles);

interface Props {
  data: CommentType;
}

export default function Comment({ data }: Props) {
  const {
    id,
    content,
    updatedAt,
    writer: { id: writerId, nickname, image },
  } = data;
  const { userInfo } = useUserContext();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditMode = (newEditMode: boolean) => {
    setIsEditMode(newEditMode);
  };

  return (
    <div className={cx("comment-container")}>
      <div className={cx("content")}>
        {!isEditMode ? (
          <span>{content}</span>
        ) : (
          <EditForm
            commentId={id}
            initialValue={content}
            handleEditMode={handleEditMode}
          />
        )}

        {userInfo?.id === writerId && !isEditMode && (
          <UpdatePopover commentId={id} handleEditMode={handleEditMode} />
        )}
      </div>

      <div className={cx("profile-img-container")}>
        <Profile image={image} name={nickname} />
        <span className={cx("username")}>{nickname}</span>
        <span className={cx("updated-time")}>{formatTimeAgo(updatedAt)}</span>
      </div>
    </div>
  );
}
