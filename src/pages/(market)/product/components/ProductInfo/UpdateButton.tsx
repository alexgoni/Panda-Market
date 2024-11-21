import kebabIcon from "assets/icons/ic_kebab.svg";
import classNames from "classnames/bind";
import Popover from "components/Popover";

import styles from "../../Product.module.scss";

const cx = classNames.bind(styles);

export default function UpdateButton() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <img src={kebabIcon} alt="kebab" />
      </Popover.Trigger>

      <Popover.Content position="right">
        <ul className={cx("popover-content")}>
          <li>수정하기</li>
          <li>삭제하기</li>
        </ul>
      </Popover.Content>
    </Popover.Root>
  );
}
