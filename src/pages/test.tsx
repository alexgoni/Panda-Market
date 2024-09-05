import Button from "components/Button";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";

export default function Test() {
  const [page, setPage] = useState(2);

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
        totalPages={7}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </>
  );
}
