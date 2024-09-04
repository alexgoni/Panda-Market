import Button from "components/Button";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";

export default function Test() {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetch("/api/users");
  }, []);

  return (
    <>
      <Button>판다마켓</Button>
      <Pagination
        currentPage={page}
        totalPages={7}
        onPageChange={handlePageChange}
      />
    </>
  );
}
