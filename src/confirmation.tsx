import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfirmationPage />
  </StrictMode>,
);
