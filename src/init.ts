import {
  themeParams,
  initData,
  viewport,
  closingBehavior,
  swipeBehavior,
  init as initSDK,
  miniApp,
  backButton,
} from "@tma.js/sdk-react";

export async function init() {
  initSDK();

  backButton.mount.ifAvailable();
  initData.restore();

  if (miniApp.mount.isAvailable()) {
    themeParams.mount();
    miniApp.mount();
    themeParams.bindCssVars();
    miniApp.setHeaderColor("#efefef");
    miniApp.setBgColor("#efefef");
    miniApp.setBottomBarColor("#efefef");
  }

  if (closingBehavior.mount.isAvailable()) {
    closingBehavior.mount();
    closingBehavior.enableConfirmation();
  }

  if (swipeBehavior.mount.isAvailable()) {
    swipeBehavior.mount();
    swipeBehavior.disableVertical();
  }

  if (viewport.mount.isAvailable()) {
    viewport.mount().then(() => {
      viewport.bindCssVars();
    });

    viewport.expand();
  }
}
