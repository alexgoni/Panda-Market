/* eslint-disable react/no-array-index-key */
import deviceStateAtom, { Device } from "context/deviceState";
import { useAtomValue } from "jotai";

import Card from "../Card";

export default function Loading() {
  const deviceState = useAtomValue(deviceStateAtom);

  let skeletonCount;
  if (deviceState === Device.Mobile) skeletonCount = 1;
  if (deviceState === Device.Tablet) skeletonCount = 2;
  if (deviceState === Device.PC) skeletonCount = 4;

  return (
    <>
      {Array.from({ length: skeletonCount as number }).map((_, idx) => (
        <Card.Skeleton key={idx} />
      ))}
    </>
  );
}
