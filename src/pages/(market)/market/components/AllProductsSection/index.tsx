import ErrorBoundary from "components/Layout/ErrorBoundary";
import { Suspense } from "react";

import AllProducts from "./AllProducts";
import DataContainer from "./DataContainer";
import Error from "./Error";
import Header from "./Header";
import Loading from "./Loading";
import PaginationWrapper from "./PaginationWrapper";

export default function AllProductsSection() {
  return (
    <>
      <Header />
      <DataContainer>
        <ErrorBoundary fallback={<Error />}>
          <Suspense fallback={<Loading />}>
            <AllProducts />
          </Suspense>
        </ErrorBoundary>
      </DataContainer>
      <PaginationWrapper />
    </>
  );
}
