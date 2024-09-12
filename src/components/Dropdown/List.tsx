import classNames from "classnames/bind";
import { PropsWithChildren, useMemo } from "react";

import styles from "./Dropdown.module.scss";
import { useDropdownContext } from "./Root";

const cx = classNames.bind(styles);

interface Props extends PropsWithChildren {
  position?: "center" | "left" | "right";
  width?: string;
}

export default function List({ children, position = "center", width }: Props) {
  const { isOpen, triggerRef } = useDropdownContext();

  const { topPosition, triggerWidth } = useMemo(() => {
    if (!triggerRef.current) return { topPosition: "0", triggerWidth: "0" };

    const rect = triggerRef.current.getBoundingClientRect();
    return {
      topPosition: `${rect.height + 8}px`,
      triggerWidth: `${rect.width}px`,
    };
  }, [triggerRef.current]);

  const listStyle = useMemo(() => {
    if (position === "center") {
      return {
        width: triggerWidth,
      };
    }

    if (position === "left") {
      return {
        width: width ?? triggerWidth,
        left: 0,
      };
    }

    if (position === "right") {
      return {
        width: width ?? triggerWidth,
        right: 0,
      };
    }

    return undefined;
  }, [position, width, triggerRef.current]);

  if (!isOpen) return null;

  return (
    <ul
      style={{ top: topPosition, ...listStyle }}
      className={cx("option-list")}
    >
      {children}
    </ul>
  );
}
