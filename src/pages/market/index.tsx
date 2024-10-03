import Footer from "components/Layout/Footer";
import MainLayout from "components/Layout/MainLayout";
import Navbar from "components/Layout/Navbar";

import AllProductsSection from "./components/AllProductsSection";
import BestProductsSection from "./components/BestProductsSection";

export default function Market() {
  return (
    <>
      <Navbar />
      <MainLayout>
        <BestProductsSection />
        <AllProductsSection />
      </MainLayout>
      <Footer />
    </>
  );
}
