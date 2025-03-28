import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import App from "./components/app";

axios
  .get("http://localhost:3000/auth")
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
