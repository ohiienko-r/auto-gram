import { useNavigate } from "react-router";
import { ROUTES_NAMES } from "@/constants/router";

import { Button } from "@/components/ui/button";

import FavoritesEmptyIcon from "@/icons/FavoritesEmptyIcon";
import SearchIcon from "@/icons/SearchIcon";

export default function FavoritesEmpty() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-8">
      <FavoritesEmptyIcon />

      <div className="flex flex-col items-center gap-6">
        <h2 className="font-semibold text-2xl">Ви ще не зберігали авто</h2>

        <Button onClick={() => navigate(ROUTES_NAMES.SEARCH)}>
          Шукати <SearchIcon className="text-white" />
        </Button>
      </div>
    </div>
  );
}
