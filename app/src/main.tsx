import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

function mountApp() {
  const rootElement = globalThis.document?.getElementById("root");

  if (!rootElement) {
    return;
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

mountApp();
