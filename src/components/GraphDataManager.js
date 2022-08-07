import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import url from "../globals";

export default function GraphDataManager({ graphRef }) {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [focus, setFocus] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url + "/graph")
      .then((response) => {
        setNodes(response.data.nodes);
        setLinks(response.data.links);
        setFocus(null);
      });
  }, []);

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