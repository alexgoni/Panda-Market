import arrowLeft from "assets/icons/ic_arrow_left.svg";
import arrowRight from "assets/icons/ic_arrow_right.svg";
import classNames from "classnames/bind";
import { useMemo } from "react";

// eslint-disable-next-line import/no-cycle
import { usePaginationContext } from ".";
import styles from "./Pagination.module.scss";

const PAGE_DISPLAY_COUNT = 5;

export function PrevButton() {
  const { onPageChange, currentPage } = usePaginationContext();

  const currentGroup = useMemo(
    () => Math.ceil(currentPage / PAGE_DISPLAY_COUNT),
    [currentPage],
  );
  const isDisabled = currentPage <= PAGE_DISPLAY_COUNT;

  const handleClick = () => {
    if (isDisabled) return;

    const prevFirstPage = (currentGroup - 2) * PAGE_DISPLAY_COUNT + 1;
    onPageChange(prevFirstPage);
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      className={styles.control}
    >
      <img src={arrowLeft} alt="prev" />
    </button>
  );
}

export function NextButton() {
  const { onPageChange, currentPage, totalPages } = usePaginationContext();

  const lastGroup = useMemo(
    () => Math.ceil(totalPages / PAGE_DISPLAY_COUNT),
    [totalPages],
  );
  const firstPageInLastGroup = (lastGroup - 1) * PAGE_DISPLAY_COUNT + 1;
  const isDisabled = currentPage >= firstPageInLastGroup;

  const handleClick = () => {
    if (isDisabled) return;

    const currentGroup = Math.ceil(currentPage / PAGE_DISPLAY_COUNT);
    const nextFirstPage = currentGroup * PAGE_DISPLAY_COUNT + 1;
    onPageChange(nextFirstPage);
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      className={styles.control}
    >
      <img src={arrowRight} alt="next" />
    </button>
  );
}

export function PageList() {
  const { currentPage, totalPages } = usePaginationContext();

  const currentGroup = useMemo(
    () => Math.ceil(currentPage / PAGE_DISPLAY_COUNT),
    [currentPage],
  );
  const startPage = (currentGroup - 1) * PAGE_DISPLAY_COUNT + 1;
  const endPage = Math.min(totalPages, currentGroup * PAGE_DISPLAY_COUNT);
  const pageNumbers = useMemo(
    () =>
      Array.from(
        { length: endPage - startPage + 1 },
        (_, idx) => startPage + idx,
      ),
    [startPage, endPage],
  );

  return (
    <>
      {pageNumbers.map((page) => (
        <PageButton key={page} page={page} />
      ))}
    </>
  );
}

const cn = classNames.bind(styles);

function PageButton({ page }: { page: number }) {
  const { currentPage, onPageChange } = usePaginationContext();

  const handleClick = () => {
    onPageChange(page);
  };

  const classnames = cn("control", {
    active: currentPage === page,
  });

  return (
    <button type="button" onClick={handleClick} className={classnames}>
      {page}
    </button>
  );
}
