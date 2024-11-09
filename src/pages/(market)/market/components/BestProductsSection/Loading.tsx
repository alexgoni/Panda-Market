/* eslint-disable react/no-array-index-key */
import deviceStateAtom, { Device } from "context/deviceState";
import { useAtomValue } from "jotai";

import Card from "../Card";

export default function Loading() {
  const deviceState = useAtomValue(deviceStateAtom);
  const pageSize = getPageSize(deviceState);

  return (
    <>
      {Array.from({ length: pageSize }).map((_, idx) => (
        <Card.Skeleton key={idx} />
      ))}
    </>
  );
}

function getPageSize(deviceState: Device | null) {
  if (deviceState === Device.Mobile) return 1;
  if (deviceState === Device.Tablet) return 2;
  if (deviceState === Device.PC) return 4;
  return 4;
}
