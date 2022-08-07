import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import GraphPage from "./pages/GraphPage";
import NodePage from "./pages/NodePage";
import NotFoundPage from "./pages/NotFoundPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GraphPage />} />
        <Route path="/nodes/:id" element={<NodePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);