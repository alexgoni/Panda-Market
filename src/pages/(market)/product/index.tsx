import ErrorBoundary from "components/Layout/ErrorBoundary";
import Footer from "components/Layout/Footer";
import MainLayout from "components/Layout/MainLayout";
import Navbar from "components/Layout/Navbar";
import { Suspense } from "react";

import CommentSection from "./components/CommentSection";
import ProductInfo from "./components/ProductInfo";

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <MainLayout>
        <ErrorBoundary fallback={<>asdf</>}>
          <Suspense>
            <ProductInfo />
          </Suspense>
          <Suspense>
            <CommentSection />
          </Suspense>
        </ErrorBoundary>
      </MainLayout>
      <Footer />
    </>
  );
}
