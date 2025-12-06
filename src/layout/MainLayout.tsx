import { viewport } from "@tma.js/sdk-react";
import { Outlet } from "react-router";

export default function MainLayout() {
  const { top, right, bottom, left } = viewport.safeAreaInsets();
  const contentSafeAreaInsetTop = viewport.contentSafeAreaInsetTop();

  return (
    <main
      style={{
        paddingTop: top + contentSafeAreaInsetTop,
        paddingRight: right,
        paddingBottom: bottom || "20px",
        paddingLeft: left,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flex: "1",
        scrollbarWidth: "none",
      }}
    >
      <Outlet />
    </main>
  );
}
