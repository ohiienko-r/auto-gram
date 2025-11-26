import { Button } from "./ui/button";

import SearchIcon from "@/icons/SearchIcon";
import HeartIcon from "@/icons/HeartIcon";
import UserIcon from "@/icons/UserIcon";

export default function Navigation() {
  return (
    <nav className="flex items-center gap-1 w-full">
      <Button size={"md"} variant={"secondary"}>
        Пошук <SearchIcon />
      </Button>

      <Button size={"md"} variant={"secondary"}>
        Обране <HeartIcon />
      </Button>

      <Button size={"md"} variant={"secondary"}>
        Профіль <UserIcon />
      </Button>
    </nav>
  );
}
