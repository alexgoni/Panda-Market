import Button from "components/Button";
import Input from "components/Input";
import Pagination from "components/Pagination";
import { ChangeEvent, useEffect, useState } from "react";

export default function Test() {
  const [page, setPage] = useState(2);
  const [value, setValue] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

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
      <Input type="text" value="123" onChange={handleChange} />
      <Input type="number" value={value} onChange={handleChange} />
      <Input
        type="email"
        value=""
        onChange={handleChange}
        placeholder="이메일을 입력하세요"
      />
      <Input
        type="password"
        value=""
        onChange={handleChange}
        placeholder="asfd"
        name="asdf"
      />
      <Input
        type="search"
        value=""
        onChange={handleChange}
        placeholder="asdfsdf"
        maxWidth="500px"
      />
    </>
  );
}
