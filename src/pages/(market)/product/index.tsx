import ErrorBoundary from "components/Layout/ErrorBoundary";
import Footer from "components/Layout/Footer";
import MainLayout from "components/Layout/MainLayout";
import Navbar from "components/Layout/Navbar";
import { Suspense } from "react";

import CommentSection from "./components/CommentSection";
import Error from "./components/Error";
import ProductInfo from "./components/ProductInfo";

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <MainLayout>
        <ErrorBoundary fallback={<Error />}>
          <Suspense>
            <ProductInfo />
          </Suspense>
          <CommentSection />
        </ErrorBoundary>
      </MainLayout>
      <Footer />
    </>
  );
}
