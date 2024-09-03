import Button from "components/Button";
import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    fetch("/api/users");
  }, []);

  return (
    <>
      <Button>판다마켓</Button>
    </>
  );
}
