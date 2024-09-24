import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Landing, Login, Market, SignUp, Test } from "./pages";

export default function Router() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
