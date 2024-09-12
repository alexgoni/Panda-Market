import classNames from "classnames/bind";
import useClickOutside from "hooks/useClickOutside";
import {
  Children,
  ReactElement,
  ReactNode,
  RefObject,
  cloneElement,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import styles from "./Popover.module.scss";
// eslint-disable-next-line import/no-cycle
import Trigger from "./Trigger";

const cx = classNames.bind(styles);

interface PopoverContextType {
  isOpen: boolean;
  toggle: () => void;
  triggerRef: RefObject<HTMLDivElement>;
}

const PopoverContext = createContext<PopoverContextType | null>(null);

export function usePopoverContext() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error("Popover 컨텍스트를 호출할 수 없는 범위입니다.");
  }

  return context;
}

export default function PopoverRoot({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside({
    ref: popoverRef,
    handler: () => {
      setIsOpen(false);
    },
  });

  const contextValue = useMemo(
    () => ({
      isOpen,
      toggle,
      triggerRef,
    }),
    [isOpen],
  );

  const updatedChildren = useMemo(() => {
    const childrenElements = Children.toArray(children) as ReactElement[];

    return childrenElements.map((child) => {
      if (child.type === Trigger) {
        return cloneElement(child, { ref: triggerRef });
      }
      return child;
    });
  }, [children]);

  return (
    <PopoverContext.Provider value={contextValue}>
      <div ref={popoverRef} className={cx("root")}>
        {updatedChildren}
      </div>
    </PopoverContext.Provider>
  );
}
