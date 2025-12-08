import { Button } from "@/components/ui/button";

import ProfileEmptyIcon from "@/icons/ProfileEmptyIcon";
import PlusIcon from "@/icons/PlusIcon";

export default function ProfileEmpty() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-8">
      <ProfileEmptyIcon />

      <div className="flex flex-col items-center gap-6">
        <p className="max-w-72 font-semibold text-2xl text-center">
          Ви ще не виставили жодного авто
        </p>

        <Button>
          Додати <PlusIcon />
        </Button>
      </div>
    </div>
  );
}
