import classNames from "classnames/bind";
import Button from "components/Button";
import Input from "components/Input";
import { ChangeEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import styles from "../../Market.module.scss";
import OrderByDropdown from "./OrderByDropdown";

const cx = classNames.bind(styles);

export default function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [orderBy, setOrderBy] = useState<"최신순" | "좋아요순">(
    searchParams.get("orderBy") === "favorite" ? "좋아요순" : "최신순",
  );

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
