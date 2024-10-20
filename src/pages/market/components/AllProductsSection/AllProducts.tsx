import { useSuspenseQuery } from "@tanstack/react-query";
import { getProducts } from "api/product";
import classNames from "classnames/bind";
import deviceStateAtom, { Device } from "context/deviceState";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "utils/debounce";

import styles from "../../Market.module.scss";
import Card from "../Card";
import marketKeywordAtom from "./context/keyword";
import marketOrderByAtom from "./context/orderBy";
import marketPageAtom from "./context/page";

const cx = classNames.bind(styles);

export default function AllProducts() {
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

  if (data.list.length === 0) {
    return <h1 className={cx("no-products")}>상품이 존재하지 않습니다.</h1>;
  }

  return (
    <>
      {data.list.map((product) => (
        <Card key={product.id} data={product} />
      ))}
    </>
  );
}

function getPageSize(deviceState: Device | null) {
  if (deviceState === Device.Mobile) return 4;
  if (deviceState === Device.Tablet) return 6;
  if (deviceState === Device.PC) return 10;
  return 4;
}
