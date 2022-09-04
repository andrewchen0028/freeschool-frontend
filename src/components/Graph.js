import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import url from "../globals";

// TODO:
// - implement gmaps-style drawer
// - implement focus node highlighting
export default function Graph({ graphRef }) {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [focus, setFocus] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  // Initial load
  useEffect(() => {
    axios.get(`${url}/`)
      .then((response) => {
        setNodes(response.data.nodes);
        setLinks(response.data.links);
      });
  }, []);

  // Update focus on navigation
  useEffect(() => {
    if (graphRef.current) setFocus(
      graphRef.current.graphData().nodes.find(node => node.id === params.id)
    );
  }, [params.id, graphRef]);

  // Pan and zoom to focus
  useEffect(() => {
    if (focus && graphRef.current) {
      graphRef.current.centerAt(focus.x, focus.y, 500);
      graphRef.current.zoom(8, 500);
    }
  }, [focus, graphRef]);

  // Update graph
  useEffect(() => {
    if (graphRef.current) graphRef.current
      .graphData({ nodes: nodes, links: links })
      .onNodeClick((node) => {
        setFocus(node);
        setTimeout(() => { navigate(`nodes/${node.id}/resources`); }, 500);
      })
  }, [graphRef, nodes, links, navigate]);

  return (
    <div>
      <div id="graph" style={{ position: "absolute", zIndex: 1 }} />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
}