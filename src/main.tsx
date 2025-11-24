import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { init } from "./init.ts";
import "./index.css";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root")!);

await init().then(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
