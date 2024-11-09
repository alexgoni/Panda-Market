import classNames from "classnames/bind";

import styles from "../../Market.module.scss";
import Card from "../Card";
import useGetAllProducts from "./hooks/useGetAllProducts";

const cx = classNames.bind(styles);

export default function AllProducts() {
  const data = useGetAllProducts();

  if (data.list.length === 0) {
    return <h1 className={cx("no-products")}>상품이 존재하지 않습니다.</h1>;
  }

  return (
    <>
      {data.list.map((product) => (
        <Card key={product.id} data={product} />
      ))}
    </>
  );
}
