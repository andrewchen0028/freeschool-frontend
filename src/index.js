import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import GraphCanvas from "./components/GraphCanvas";
import NodeWindow from "./components/NodeWindow";
import { InlinkList, OutlinkList, ResourceList } from "./components/Lists";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GraphCanvas />}>
        <Route path="nodes/:id" element={<NodeWindow />}>
          <Route path="inlinks" element={<InlinkList />} />
          <Route path="outlinks" element={<OutlinkList />} />
          <Route path="resources" element={<ResourceList />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);