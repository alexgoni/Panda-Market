/* eslint-disable react/destructuring-assignment */
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// eslint-disable-next-line import/no-cycle
import { NextButton, PageList, PrevButton } from "./Controls";
import styles from "./Pagination.module.scss";

interface PaginationContextType {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationContext = createContext<PaginationContextType | null>(null);

export function usePaginationContext() {
  const context = useContext(PaginationContext);

  if (!context) {
    throw new Error("Pagination 컨텍스트를 호출할 수 없는 범위입니다.");
  }

  return context;
}

interface UsingInnerPageProps {
  totalPages: number;
  onPageChange?: (page: number) => void;
  currentPage?: never;
}

interface UsingSuperiorPageProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

type PaginationProps = UsingInnerPageProps | UsingSuperiorPageProps;

function isUsingSuperiorPageProps(
  props: PaginationProps,
): props is UsingSuperiorPageProps {
  return props.currentPage !== undefined;
}

function Pagination(props: PaginationProps) {
  const { totalPages, onPageChange } = props;
  const [innerCurrentPage, setInnerCurrentPage] = useState(1);

  const resolvedCurrentPage = isUsingSuperiorPageProps(props)
    ? props.currentPage
    : innerCurrentPage;

  const resolvedOnPageChange = useCallback(
    (page: number) => {
      if (!isUsingSuperiorPageProps(props)) setInnerCurrentPage(page);
      onPageChange?.(page);
    },
    [props],
  );

  const contextValue = useMemo(
    () => ({
      totalPages,
      currentPage: resolvedCurrentPage,
      onPageChange: resolvedOnPageChange,
    }),
    [totalPages, resolvedCurrentPage, resolvedOnPageChange],
  );

  useEffect(() => {
    if (totalPages < resolvedCurrentPage) resolvedOnPageChange(totalPages);
    if (resolvedCurrentPage <= 0) resolvedOnPageChange(1);
  }, [resolvedCurrentPage, totalPages, resolvedOnPageChange]);

  return (
    <PaginationContext.Provider value={contextValue}>
      <div className={styles.wrapper}>
        <PrevButton />
        <PageList />
        <NextButton />
      </div>
    </PaginationContext.Provider>
  );
}

export default memo(Pagination);
