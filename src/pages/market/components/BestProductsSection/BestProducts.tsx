import { Product } from "@panda-market-api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "api/product";
import deviceStateAtom, { Device } from "context/deviceState";
import { useAtomValue } from "jotai";

import Card from "../Card";

export default function BestProducts() {
  const deviceState = useAtomValue(deviceStateAtom);

  const { data } = useSuspenseQuery({
    queryKey: ["best-products", deviceState],
    queryFn: () => {
      let pageSize;
      if (deviceState === Device.Mobile) pageSize = 1;
      else if (deviceState === Device.Tablet) pageSize = 2;
      else if (deviceState === Device.PC) pageSize = 4;

      return getProducts({ pageSize, orderBy: "favorite" });
    },
    staleTime: 60 * 1000,
  });

  return (
    <>
      {data.list.map((product: Product) => (
        <Card key={product.id} data={product} />
      ))}
    </>
  );
}
