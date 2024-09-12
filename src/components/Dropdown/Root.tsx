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
import ToggleButton from "./ToggleButton";

const cx = classNames.bind(styles);

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  toggleButtonRef: RefObject<HTMLDivElement>;
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
  const toggleButtonRef = useRef<HTMLDivElement>(null);

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
      toggleButtonRef,
    }),
    [isOpen],
  );

  const childrenElements = useMemo(
    () => Children.toArray(children) as ReactElement[],
    [children],
  );

  const updatedChildren = childrenElements.map((child) => {
    if (child.type === ToggleButton) {
      return cloneElement(child, { ref: toggleButtonRef });
    }
    return child;
  });

  return (
    <DropdownContext.Provider value={contextValue}>
      <div ref={dropdownRef} className={cx("root")}>
        {updatedChildren}
      </div>
    </DropdownContext.Provider>
  );
}
