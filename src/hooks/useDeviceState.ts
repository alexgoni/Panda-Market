import deviceStateAtom, { Device } from "context/deviceState";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import useMediaQuery, {
  DESKTOP_WIDTH,
  MOBILE_WIDTH,
  TABLET_WIDTH,
} from "./useMediaQuery";

export default function useDeviceState() {
  const setDeviceStateAtom = useSetAtom(deviceStateAtom);

  const isMobile = useMediaQuery(MOBILE_WIDTH);
  const isTablet = useMediaQuery(TABLET_WIDTH);
  const isPC = useMediaQuery(DESKTOP_WIDTH);

  useEffect(() => {
    if (isMobile) setDeviceStateAtom(Device.Mobile);
    else if (isTablet) setDeviceStateAtom(Device.Tablet);
    else if (isPC) setDeviceStateAtom(Device.PC);
  }, [isMobile, isTablet, isPC]);
}
