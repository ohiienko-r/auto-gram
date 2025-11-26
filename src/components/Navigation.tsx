import { useNavigate } from "react-router";
import { NAVIGATION_ITEMS } from "@/constants/navigation";

import { Button } from "./ui/button";

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-wrap items-center gap-1 w-full">
      {NAVIGATION_ITEMS.map((item) => (
        <Button
          size={"md"}
          variant={"secondary"}
          onClick={() => navigate(item.href)}
          key={item.href}
        >
          {item.title} <item.icon />
        </Button>
      ))}
    </nav>
  );
}
