import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import App from "@/App";

import { PopupProvider } from "@/contexts/PopupContext"; // ✅


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <PopupProvider>
          <App />
        </PopupProvider>

      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
