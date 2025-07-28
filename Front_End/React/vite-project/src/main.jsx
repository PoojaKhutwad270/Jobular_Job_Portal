import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import ojpStore from "./store/ojpStore.js";

createRoot(document.getElementById("root")).render(
  <Provider store={ojpStore}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
