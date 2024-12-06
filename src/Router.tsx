import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  AddItemPage,
  EditItemPage,
  LandingPage,
  LoginPage,
  MarketPage,
  ProductPage,
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
          <Route path="/add-item" element={<AddItemPage />} />
          <Route path="/edit-item/:id" element={<EditItemPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
