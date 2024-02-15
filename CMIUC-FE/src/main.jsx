import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AnimatedCursor from "react-animated-cursor";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AnimatedCursor
      innerSize={20}
      outerSize={20}
      color="163,116,219"
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={8}
    />
    <App />
  </BrowserRouter>
);
