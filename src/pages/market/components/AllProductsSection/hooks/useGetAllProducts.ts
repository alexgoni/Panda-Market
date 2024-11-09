import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "api/product";
import deviceStateAtom, { Device } from "context/deviceState";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "utils/debounce";

import marketKeywordAtom from "../context/keyword";
import marketOrderByAtom from "../context/orderBy";
import marketPageAtom from "../context/page";

export default function useGetAllProducts() {
  const deviceState = useAtomValue(deviceStateAtom);
  const [marketPage, setMarketPage] = useAtom(marketPageAtom);
  const orderBy = useAtomValue(marketOrderByAtom);
  const keyword = useAtomValue(marketKeywordAtom);
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = getPageSize(deviceState);

  const { data } = useSuspenseQuery({
    queryKey: [
      "all-products",
      {
        deviceState,
        page: marketPage.currentPage,
        keyword: debouncedKeyword,
        orderBy,
      },
    ],
    queryFn: () =>
      getProducts({
        pageSize,
        page: marketPage.currentPage || 1,
        keyword: debouncedKeyword,
        orderBy: orderBy === "최신순" ? "recent" : "favorite",
      }),
  });

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      pageSize: String(pageSize),
    });
  }, [deviceState]);

  useEffect(() => {
    setMarketPage((prev) => ({
      ...prev,
      totalPage: Math.ceil(data.totalCount / pageSize),
    }));
  }, [data]);

  useEffect(() => {
    const debouncedSetKeyword = debounce((newKeyword: string) => {
      setDebouncedKeyword(newKeyword);
    }, 300);

    debouncedSetKeyword(keyword);
  }, [keyword]);

  return data;
}

function getPageSize(deviceState: Device | null) {
  if (deviceState === Device.Mobile) return 4;
  if (deviceState === Device.Tablet) return 6;
  if (deviceState === Device.PC) return 10;
  return 4;
}
