import { useNavigate } from "react-router";
import { ROUTES_NAMES } from "@/constants/router";

import { Button } from "@/components/ui/button";

import ProfileEmptyIcon from "@/icons/ProfileEmptyIcon";
import PlusIcon from "@/icons/PlusIcon";

export default function ProfileEmpty() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-8">
      <ProfileEmptyIcon />

      <div className="flex flex-col items-center gap-6">
        <p className="max-w-72 font-semibold text-2xl text-center">
          Ви ще не виставили жодного авто
        </p>

        <Button onClick={() => navigate(ROUTES_NAMES.CREATE_LISTING)}>
          Додати <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
