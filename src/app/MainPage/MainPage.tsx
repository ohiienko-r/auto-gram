import { useNavigate } from "react-router";
import { ROUTES_NAMES } from "@/constants/router";

import AdvertisementCard from "../../components/AdvertisementCard";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Navigation from "@/components/Navigation";

import PlusIcon from "@/icons/PlusIcon";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col flex-1 gap-4 px-4 pt-5 overflow-hidden">
      <header className="flex justify-between items-center">
        <Logo />

        <Button
          size={"icon-sm"}
          onClick={() => navigate(ROUTES_NAMES.CREATE_LISTING)}
        >
          <PlusIcon />
        </Button>
      </header>

      <Navigation />

      <section className="flex flex-col flex-1 gap-3 overflow-y-auto">
        <h3 className="font-medium text-black/60 text-base">Рекомендуємо</h3>

        <div className="flex flex-col gap-5">
          <AdvertisementCard />

          <AdvertisementCard />

          <AdvertisementCard />
        </div>
      </section>
    </section>
  );
}
