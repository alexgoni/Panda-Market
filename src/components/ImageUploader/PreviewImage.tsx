import { ReactComponent as XIcon } from "assets/icons/ic_X.svg";
import classNames from "classnames/bind";

import styles from "./ImageUploader.module.scss";

const cx = classNames.bind(styles);

interface Props {
  data: string;
  onDelete: () => void;
}

export default function PreviewImage({ data, onDelete }: Props) {
  return (
    <div className={cx("preview-image-wrapper")}>
      <div className={cx("inner")}>
        <img src={data} alt="preview" className={cx("preview-image")} />
        <button
          type="button"
          onClick={onDelete}
          className={cx("delete-icon")}
          aria-label="delete-icon"
        >
          <XIcon />
        </button>
      </div>
    </div>
  );
}
