import kebabIcon from "assets/icons/ic_kebab.svg";
import classNames from "classnames/bind";
import Popover from "components/Popover";

import styles from "../../Product.module.scss";
import useCommentAction from "./hooks/useCommentAction";

const cx = classNames.bind(styles);

interface Props {
  commentId: number;
  handleEditMode: (newEditMode: boolean) => void;
}

export default function UpdatePopover({ commentId, handleEditMode }: Props) {
  const { deleteMutation } = useCommentAction("delete", { commentId });

  const handleDeleteComment = () => {
    deleteMutation.mutate();
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <img src={kebabIcon} alt="kebab" />
      </Popover.Trigger>

      <Popover.Content position="right">
        <ul className={cx("popover-content")}>
          <li>
            <button type="button" onClick={() => handleEditMode(true)}>
              수정하기
            </button>
          </li>
          <li>
            <button type="button" onClick={handleDeleteComment}>
              삭제하기
            </button>
          </li>
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
}
