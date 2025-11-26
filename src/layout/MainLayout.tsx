import { viewport } from "@tma.js/sdk-react";
import { Outlet } from "react-router";

export default function MainLayout() {
  const { top, right, bottom, left } = viewport.safeAreaInsets();
  const contentSafeAreaInsetTop = viewport.contentSafeAreaInsetTop();

  return (
    <main
      className="size-full"
      style={{
        paddingTop: top + contentSafeAreaInsetTop,
        paddingRight: right,
        paddingBottom: bottom,
        paddingLeft: left,
      }}
    >
      <Outlet />
    </main>
  );
}
