import arrowDown from "assets/icons/ic_arrow_down.svg";
import orderByIcon from "assets/icons/ic_order_by.svg";
import classNames from "classnames/bind";
import Dropdown from "components/Dropdown";

import styles from "../Market.module.scss";

const cx = classNames.bind(styles);

interface Props {
  orderBy: string;
  handleOrderChange: (newOrder: string) => void;
}

export default function OrderByDropdown({ orderBy, handleOrderChange }: Props) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        {({ isOpen, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className={cx("toggle-button")}
          >
            <img
              src={orderByIcon}
              alt="dropdown"
              className={cx("mobile-icon")}
            />
            <span className={cx("content")}>
              {orderBy}
              <img
                src={arrowDown}
                alt="arrow-down"
                className={cx({ open: isOpen })}
              />
            </span>
          </button>
        )}
      </Dropdown.Trigger>

      <Dropdown.List>
        <Dropdown.Option
          onClick={() => {
            handleOrderChange("최신순");
          }}
        >
          최신순
        </Dropdown.Option>
        <Dropdown.Option
          onClick={() => {
            handleOrderChange("좋아요순");
          }}
        >
          좋아요순
        </Dropdown.Option>
      </Dropdown.List>
    </Dropdown.Root>
  );
}
