import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import App from "./App.jsx";

const root = document.getElementById("root");
root.className = "background";

createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
