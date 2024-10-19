import classNames from "classnames/bind";
import ErrorBoundary from "components/Layout/ErrorBoundary";
import { Suspense } from "react";

import styles from "../../Market.module.scss";
import BestProducts from "./BestProducts";
import DataContainer from "./DataContainer";
import Error from "./Error";
import Loading from "./Loading";

const cx = classNames.bind(styles);

export default function BestProductsSection() {
  return (
    <>
      <h1 className={cx("best-products-title")}>베스트 상품</h1>

      <DataContainer>
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <BestProducts />
          </Suspense>
        </ErrorBoundary>
      </DataContainer>
    </>
  );
}
