import classNames from "classnames/bind";
import { PropsWithChildren, useMemo } from "react";

import styles from "./Popover.module.scss";
import { usePopoverContext } from "./Root";

const cx = classNames.bind(styles);

interface Props extends PropsWithChildren {
  position?: "left" | "right";
  top?: 8 | 12 | 16;
}

export default function Content({
  children,
  position = "right",
  top = 8,
}: Props) {
  const { isOpen, triggerRef } = usePopoverContext();

  const contentStyle = useMemo(() => {
    if (!triggerRef.current) return { top: "0" };

    const rect = triggerRef.current.getBoundingClientRect();
    const calculatedTop = `${rect.height + top}px`;

    if (position === "left") {
      return {
        top: calculatedTop,
        left: 0,
      };
    }

    if (position === "right") {
      return {
        top: calculatedTop,
        right: 0,
      };
    }

    return { top: calculatedTop };
  }, [position, triggerRef.current]);

  if (!isOpen) return null;

  return (
    <div className={cx("content")} style={{ ...contentStyle }}>
      {children}
    </div>
  );
}
