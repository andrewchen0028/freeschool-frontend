import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./pages/App";
import NodeWindow from "./pages/NodeWindow";
import NotFoundPage from "./pages/NotFoundPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/nodes/:id" element={<NodeWindow />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);