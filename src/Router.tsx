import ProductPage from "pages/product";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  LandingPage,
  LoginPage,
  MarketPage,
  SignUpPage,
  TestPage,
} from "./pages";

export default function Router() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
