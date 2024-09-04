import {
  createContext,
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

interface Props {
  totalPages: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const [innerCurrentPage, setInnerCurrentPage] = useState(1);
  const resolvedCurrentPage =
    currentPage !== undefined ? currentPage : innerCurrentPage;
  const resolvedOnPageChange = useCallback(
    (page: number) => {
      if (currentPage === undefined) setInnerCurrentPage(page);
      onPageChange?.(page);
    },
    [currentPage, onPageChange],
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
