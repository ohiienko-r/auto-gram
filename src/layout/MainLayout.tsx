import useTelegramLogin from "@/hooks/useTelegramLogin";
import FiltersProvider from "@/providers/FiltersProvider";
import { viewport, useRawInitData } from "@tma.js/sdk-react";
import { Outlet } from "react-router";

import SplashScreen from "@/components/SplashScreen";

export default function MainLayout() {
  const { top, right, bottom, left } = viewport.safeAreaInsets();
  const contentSafeAreaInsetTop = viewport.contentSafeAreaInsetTop();
  const initDataRaw = useRawInitData();
  const { data, isLoading } = useTelegramLogin(initDataRaw);

  if (isLoading) {
    return <SplashScreen />;
  }

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
      <FiltersProvider enabled={!!data?.tokens?.access}>
        <Outlet />
      </FiltersProvider>
    </main>
  );
}
