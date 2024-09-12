import { ReactNode, forwardRef } from "react";

// eslint-disable-next-line import/no-cycle
import { useDropdownContext } from "./Root";

interface Props {
  children: ({
    isOpen,
    toggle,
  }: {
    isOpen: boolean;
    toggle: () => void;
  }) => ReactNode;
}

const Trigger = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  const { isOpen, toggle } = useDropdownContext();

  return <div ref={ref}>{children({ isOpen, toggle })}</div>;
});

export default Trigger;
