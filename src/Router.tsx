import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Market, Test } from "./pages";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="test" element={<Test />} />
        <Route path="market" element={<Market />} />
      </Routes>
    </BrowserRouter>
  );
}
