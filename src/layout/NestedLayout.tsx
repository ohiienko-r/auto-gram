import { Outlet } from "react-router";
import useBackButton from "@/hooks/useBackButton";

export default function NestedLayout() {
  useBackButton();
  return <Outlet />;
}
