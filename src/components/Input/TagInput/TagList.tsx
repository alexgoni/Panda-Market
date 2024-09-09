import { ReactComponent as XIcon } from "assets/icons/ic_X.svg";
import classNames from "classnames/bind";
import { memo, useMemo } from "react";

import styles from "../Input.module.scss";

const cx = classNames.bind(styles);

interface Props {
  data: string[];
  onDelete: (target: string) => void;
}

function TagList({ data, onDelete: handleDelete }: Props) {
  const reversedTagList = useMemo(() => [...data].reverse(), [data]);

  return (
    <ul className={cx("tag-list")}>
      {reversedTagList.map((tag) => (
        <li key={tag} className={cx("tag")}>
          #{tag}
          <button
            type="button"
            aria-label="delete-icon"
            className={cx("delete-icon")}
            onClick={() => handleDelete(tag)}
          >
            <XIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default memo(TagList);
