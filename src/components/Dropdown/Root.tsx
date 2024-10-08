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

import styles from "./Dropdown.module.scss";
// eslint-disable-next-line import/no-cycle
import Trigger from "./Trigger";

const cx = classNames.bind(styles);

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  triggerRef: RefObject<HTMLDivElement>;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export function useDropdownContext() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("Dropdown 컨텍스트를 호출할 수 없는 범위입니다.");
  }

  return context;
}

export default function DropdownRoot({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside({
    ref: dropdownRef,
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
    <DropdownContext.Provider value={contextValue}>
      <div ref={dropdownRef} className={cx("root")}>
        {updatedChildren}
      </div>
    </DropdownContext.Provider>
  );
}
