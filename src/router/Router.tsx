import { BrowserRouter, Routes, Route } from "react-router";

import MainLayout from "@/layout/MainLayout";

import MainPage from "@/app/MainPage/MainPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
