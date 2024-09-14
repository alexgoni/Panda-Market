import Footer from "components/Layout/Footer";
import MainLayout from "components/Layout/MainLayout";
import Navbar from "components/Layout/Navbar";

import Banner from "./components/Banner";
import BottomBanner from "./components/BottomBanner";
import { Section } from "./components/Section";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Banner />
      <MainLayout>
        <Section type="hot-item" />
        <Section type="search" direction="right" />
        <Section type="register" />
      </MainLayout>
      <BottomBanner />
      <Footer />
    </>
  );
}