import { BrowserRouter, Routes, Route } from "react-router";
import { ROUTES_NAMES } from "@/constants/router";

import MainLayout from "@/layout/MainLayout";
import NestedLayout from "@/layout/NestedLayout";

import MainPage from "@/app/MainPage/MainPage";
import SearchPage from "@/app/SearchPage/SearchPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<MainPage />} />

          <Route element={<NestedLayout />}>
            <Route path={ROUTES_NAMES.SEARCH} element={<SearchPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
