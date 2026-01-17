import { BrowserRouter, Routes, Route } from "react-router";
import { ROUTES_NAMES } from "@/constants/router";

import MainLayout from "@/layout/MainLayout";
import NestedLayout from "@/layout/NestedLayout";

import MainPage from "@/app/MainPage/MainPage";
import SearchPage from "@/app/SearchPage/SearchPage";
import FavoritesPage from "@/app/FavoritesPage/FavoritesPage";
import DetailsPage from "@/app/DetailsPage/DetailsPage";
import ProfilePage from "@/app/ProfilePage/ProfilePage";
import CreateListingPage from "@/app/CreateListingPage/CreateListingPage";
import EditListingPage from "@/app/EditListingPage/EditListingPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<MainPage />} />

          <Route element={<NestedLayout />}>
            <Route path={ROUTES_NAMES.SEARCH} element={<SearchPage />} />
            <Route path={ROUTES_NAMES.FAVORITES} element={<FavoritesPage />} />
            <Route
              path={`${ROUTES_NAMES.DETAILS}/:id`}
              element={<DetailsPage />}
            />
            <Route path={ROUTES_NAMES.PROFILE} element={<ProfilePage />} />
            <Route
              path={ROUTES_NAMES.CREATE_LISTING}
              element={<CreateListingPage />}
            />
            <Route
              path={`${ROUTES_NAMES.EDIT_LISTING}/:id`}
              element={<EditListingPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
