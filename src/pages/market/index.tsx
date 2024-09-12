import Footer from "components/Layout/Footer";
import MainLayout from "components/Layout/MainLayout";
import Navbar from "components/Layout/Navbar";
import { useState } from "react";

import OrderByDropdown from "./components/OrderByDropdown";

export default function Market() {
  const [orderBy, setOrderBy] = useState("최신순");

  const handleOrderChange = (newOrder: string) => {
    setOrderBy(newOrder);
  };

  return (
    <>
      <Navbar />
      <MainLayout>
        <OrderByDropdown
          orderBy={orderBy}
          handleOrderChange={handleOrderChange}
        />
      </MainLayout>
      <Footer />
    </>
  );
}
