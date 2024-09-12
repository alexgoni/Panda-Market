import classNames from "classnames/bind";
import { PropsWithChildren, useMemo } from "react";

import styles from "./Popover.module.scss";
import { usePopoverContext } from "./Root";

const cx = classNames.bind(styles);

interface Props extends PropsWithChildren {
  position?: "left" | "right";
}

export default function Content({ children, position = "right" }: Props) {
  const { isOpen, triggerRef } = usePopoverContext();

  const contentStyle = useMemo(() => {
    if (!triggerRef.current) return { top: "0" };

    const rect = triggerRef.current.getBoundingClientRect();
    const top = `${rect.height + 8}px`;

    if (position === "left") {
      return {
        top,
        left: 0,
      };
    }

    if (position === "right") {
      return {
        top,
        right: 0,
      };
    }

    return { top };
  }, [position, triggerRef.current]);

  if (!isOpen) return null;

  return (
    <div className={cx("content")} style={{ ...contentStyle }}>
      {children}
    </div>
  );
}
