import { ROUTES_NAMES } from "./router";

import HeartIcon from "@/icons/HeartIcon";
import UserIcon from "@/icons/UserIcon";

export const NAVIGATION_ITEMS = [
  {
    title: "Обране",
    icon: <HeartIcon />,
    href: ROUTES_NAMES.FAVORITES,
  },
  {
    title: "Профіль",
    icon: <UserIcon />,
    href: ROUTES_NAMES.PROFILE,
  },
] as const;
