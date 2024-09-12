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
  const { isOpen, toggleButtonRef } = useDropdownContext();

  const { topPosition, buttonWidth } = useMemo(() => {
    if (!toggleButtonRef.current) return { topPosition: "0", buttonWidth: "0" };

    const rect = toggleButtonRef.current.getBoundingClientRect();
    return {
      topPosition: `${rect.height + 8}px`,
      buttonWidth: `${rect.width}px`,
    };
  }, [toggleButtonRef.current]);

  const inlineStyle = useMemo(() => {
    if (position === "center") {
      return {
        width: buttonWidth,
      };
    }

    if (position === "left") {
      return {
        width: width ?? buttonWidth,
        left: 0,
      };
    }

    if (position === "right") {
      return {
        width: width ?? buttonWidth,
        right: 0,
      };
    }

    return undefined;
  }, [position, width]);

  if (!isOpen) return null;

  return (
    <ul
      style={{ top: topPosition, ...inlineStyle }}
      className={cx("option-list")}
    >
      {children}
    </ul>
  );
}
