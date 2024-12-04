import classNames from "classnames/bind";
import Pagination from "components/Pagination";
import { useAtomValue } from "jotai";
import { useSearchParams } from "react-router-dom";

import styles from "../../Market.module.scss";
import totalPageAtom from "./context/page";

const cx = classNames.bind(styles);

export default function PaginationWrapper() {
  const totalPage = useAtomValue(totalPageAtom);
  const [searchParams, setSearchParams] = useSearchParams();

  const hanlePageChange = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: String(page),
    });
  };

  if (!totalPage) return null;

  return (
    <div className={cx("pagination-wrapper")}>
      <Pagination
        currentPage={Number(searchParams.get("page")) ?? 1}
        totalPages={totalPage}
        onPageChange={hanlePageChange}
      />
    </div>
  );
}
