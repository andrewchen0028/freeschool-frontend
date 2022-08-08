import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

import url from "../globals";

export default function GraphCanvas({ graphRef }) {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [focus, setFocus] = useState(null);

  const navigate = useNavigate();
  const { state } = useLocation();

  const refresh = () => {
    axios
      .get(url + "/graph")
      .then((response) => {
        setNodes(response.data.nodes);
        setLinks(response.data.links);
        setFocus(null);
      });

    // TODO: Find how to start from current layout instead of from scratch.
    // 
    // UPDATE: Probably necessary to save node locations for use as initial
    // coordinates of re-render.
    console.log("refreshed graphCanvas");
  }

  // NOTE: `state.stale` is never actually read; graph just sees
  // that `state` is now defined and therefore triggers a re-render.
  useEffect(() => { refresh(); }, [state]);

  useEffect(() => {
    if (graphRef.current) graphRef.current
      .graphData({ nodes: nodes, links: links })
      .onNodeClick((node) => {
        setFocus(node);
        setTimeout(() => { navigate(`/nodes/${node.id}`); }, 500);
      });
  }, [graphRef, nodes, links, navigate]);

  useEffect(() => {
    if (focus) graphRef.current.centerAt(focus.x, focus.y, 250);
  }, [graphRef, focus]);

  return <div id="graph" />;
}