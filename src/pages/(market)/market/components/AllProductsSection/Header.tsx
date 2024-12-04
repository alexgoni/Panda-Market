import classNames from "classnames/bind";
import Button from "components/Button";
import Input from "components/Input";
import { useAtom } from "jotai";
import { ChangeEvent, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import styles from "../../Market.module.scss";
import OrderByDropdown from "./OrderByDropdown";
import marketKeywordAtom from "./context/keyword";
import marketOrderByAtom from "./context/orderBy";

const cx = classNames.bind(styles);

export default function Header() {
  const [keyword, setKeyword] = useAtom(marketKeywordAtom);
  const [orderBy, setOrderBy] = useAtom(marketOrderByAtom);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newKeyword = e.target.value;

    setKeyword(newKeyword);

    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: "1",
      keyword: newKeyword,
    });
  };

  const handleOrderChange = (newOrder: "최신순" | "좋아요순") => {
    setOrderBy(newOrder);

    const orderByInEnglish = newOrder === "최신순" ? "recent" : "favorite";
    setSearchParams({
      ...Object.fromEntries(searchParams),
      orderBy: orderByInEnglish,
    });
  };

  // searchParams 기반 state 초기화
  useEffect(() => {
    const newKeyword = searchParams.get("keyword");
    const newOrderBy = searchParams.get("orderBy");

    if (newKeyword !== null) setKeyword(newKeyword);

    if (newOrderBy !== null) {
      const orderByInKorean = newOrderBy === "recent" ? "최신순" : "좋아요순";
      setOrderBy(orderByInKorean);
    }
  }, []);

  return (
    <div className={cx("all-products-header")}>
      <h1 className={cx("title")}>전체 상품</h1>

      <div className={cx("search-input-wrapper")}>
        <Input
          type="search"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="검색할 상품을 입력해주세요"
        />
      </div>
      <Link to="/add-item" className={cx("button-wrapper")}>
        <Button width="140px" height="42px">
          상품 등록하기
        </Button>
      </Link>
      <div className={cx("dropdown-wrapper")}>
        <OrderByDropdown orderBy={orderBy} onOrderChange={handleOrderChange} />
      </div>
    </div>
  );
}
