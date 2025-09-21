import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "katex/dist/katex.min.css";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
  </ThemeProvider>
);
