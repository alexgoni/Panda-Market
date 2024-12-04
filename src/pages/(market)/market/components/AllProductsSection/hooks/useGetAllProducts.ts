import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "api/product";
import deviceStateAtom, { Device } from "context/deviceState";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useDeferredValue, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "utils/debounce";

import totalPageAtom from "../context/page";

export default function useGetAllProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const setTotalPage = useSetAtom(totalPageAtom);
  // page
  const deferredPage = useDeferredValue(searchParams.get("page"));
  // orderBy
  const deferredOrderBy = useDeferredValue(searchParams.get("orderBy")) as
    | "recent"
    | "favorite"
    | null;
  // keyword
  const [debouncedKeyword, setDebouncedKeyword] = useState(
    searchParams.get("keyword"),
  );
  const deferredKeyword = useDeferredValue(debouncedKeyword);
  // pageSize
  const deviceState = useAtomValue(deviceStateAtom);
  const pageSize = getPageSize(deviceState);

  const { data } = useSuspenseQuery({
    queryKey: [
      "all-products",
      {
        deviceState,
        page: deferredPage || 1,
        keyword: deferredKeyword || "",
        orderBy: deferredOrderBy || "recent",
      },
    ],
    queryFn: () =>
      getProducts({
        pageSize,
        page: Number(searchParams.get("page")) || 1,
        keyword: deferredKeyword || "",
        orderBy: deferredOrderBy || "recent",
      }),
  });

  // data onSuccess
  useEffect(() => {
    if (data) setTotalPage(Math.ceil(data.totalCount / pageSize));
  }, [data]);

  // deviceState에 따라 쿼리 스트링 업데이트
  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      pageSize: String(pageSize),
    });
  }, [deviceState]);

  // debounce 적용
  const debouncedSetKeyword = useCallback(
    debounce((newKeyword: string) => {
      setDebouncedKeyword(newKeyword);
    }, 300),
    [],
  );

  useEffect(() => {
    debouncedSetKeyword(searchParams.get("keyword") || "");
  }, [searchParams.get("keyword"), debouncedSetKeyword]);

  return data;
}

function getPageSize(deviceState: Device | null) {
  if (deviceState === Device.Mobile) return 4;
  if (deviceState === Device.Tablet) return 6;
  if (deviceState === Device.PC) return 10;
  return 4;
}
