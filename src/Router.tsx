import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Test } from "./pages";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
