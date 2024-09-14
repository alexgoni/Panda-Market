import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Landing, Market, Test } from "./pages";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Landing />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </BrowserRouter>
  );
}
