import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import url from "../globals";

// TODO:
// - move to focus node on navigation
// - implement focus node highlighting
// - implement gmaps-style drawer or translucent nodewindow
export default function Graph({ graphRef }) {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/`)
      .then((response) => {
        setNodes(response.data.nodes);
        setLinks(response.data.links);
      });
  }, []);

  useEffect(() => {
    if (graphRef.current) graphRef.current
      .graphData({ nodes: nodes, links: links })
      .onNodeClick((node) => {
        graphRef.current.centerAt(node.x, node.y, 500);
        graphRef.current.zoom(8, 500);
        setTimeout(() => { navigate(`nodes/${node.id}/resources`); }, 500);
      });
  }, [graphRef, nodes, links, navigate]);

  return (
    <div>
      <div id="graph" style={{ position: "absolute", zIndex: 1 }} />
      <Outlet />
    </div>
  );
}