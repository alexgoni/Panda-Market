import { PropsWithChildren, forwardRef } from "react";

// eslint-disable-next-line import/no-cycle
import { usePopoverContext } from "./Root";

const Trigger = forwardRef<HTMLButtonElement, PropsWithChildren>(
  ({ children }, ref) => {
    const { toggle } = usePopoverContext();

    return (
      <button type="button" ref={ref} onClick={toggle}>
        {children}
      </button>
    );
  },
);

export default Trigger;
