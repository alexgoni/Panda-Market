import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "api/product";
import deviceStateAtom, { Device } from "context/deviceState";
import { useAtomValue } from "jotai";

import Card from "../Card";

export default function BestProducts() {
  const deviceState = useAtomValue(deviceStateAtom);
  const pageSize = getPageSize(deviceState);

  const { data } = useSuspenseQuery({
    queryKey: ["best-products", { deviceState }],
    queryFn: () => getProducts({ pageSize, orderBy: "favorite" }),
    staleTime: 60 * 1000,
  });

  return (
    <>
      {data.list.map((product) => (
        <Card key={product.id} data={product} />
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
