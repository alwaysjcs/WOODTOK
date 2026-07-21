import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

const updateSW = registerSW({
  immediate: true,

  onNeedRefresh() {
    if (confirm("새 버전이 있습니다.\n업데이트하시겠습니까?")) {
      updateSW(true);
    }
  },

  onOfflineReady() {
    console.log("WOODTOK Offline Ready");
  },
});
