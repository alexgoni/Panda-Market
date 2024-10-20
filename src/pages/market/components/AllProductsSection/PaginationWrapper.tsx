import classNames from "classnames/bind";
import Pagination from "components/Pagination";
import { useAtom } from "jotai";
import { useSearchParams } from "react-router-dom";

import styles from "../../Market.module.scss";
import marketPageAtom from "./context/page";

const cx = classNames.bind(styles);

export default function PaginationWrapper() {
  const [marketPage, setMarketPage] = useAtom(marketPageAtom);
  const [searchParams, setSearchParams] = useSearchParams();

  const hanlePageChange = (page: number) => {
    setMarketPage((prev) => ({
      ...prev,
      currentPage: page,
    }));

    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: String(page),
    });
  };

  if (!marketPage.totalPage) return null;

  return (
    <div className={cx("pagination-wrapper")}>
      <Pagination
        totalPages={marketPage.totalPage}
        onPageChange={hanlePageChange}
      />
    </div>
  );
}
