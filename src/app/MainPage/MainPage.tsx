import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

import PlusIcon from "@/icons/PlusIcon";

export default function MainPage() {
  return (
    <section className="flex flex-col flex-1 gap-4 px-4 pt-5">
      <header className="flex justify-between items-center">
        <Logo />

        <Button size={"icon-sm"}>
          <PlusIcon />
        </Button>
      </header>
      <Navigation />
    </section>
  );
}
