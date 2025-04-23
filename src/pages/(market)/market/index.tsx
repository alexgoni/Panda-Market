import CoCursorProvider from "cocursor";
import Footer from "components/Layout/Footer";
import MainLayout from "components/Layout/MainLayout";
import Navbar from "components/Layout/Navbar";

import AllProductsSection from "./components/AllProductsSection";
import BestProductsSection from "./components/BestProductsSection";

export default function Market() {
  return (
    <CoCursorProvider
      apiKey={process.env.REACT_APP_COCURSOR_API_KEY as string}
      channel="market"
    >
      <Navbar />
      <MainLayout>
        <BestProductsSection />
        <AllProductsSection />
      </MainLayout>
      <Footer />
    </CoCursorProvider>
  );
}
