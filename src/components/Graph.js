import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { url } from "../globals";

// TODO:
// - pan & zoom to focus on page reload
// - implement focus node highlighting
// - fix graph panning slightly on any action
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
    if (graphRef.current) {
      const focus = graphRef.current.graphData().nodes
        .find(node => node.id === params.id);
      setFocus(focus);
      if (focus) {
        graphRef.current.centerAt(focus.x, focus.y).zoom(8);
      }
    }
  }, [params.id, graphRef]);


  // Update graph
  useEffect(() => {
    if (graphRef.current) graphRef.current
      .graphData({ nodes: nodes, links: links })
      .onNodeClick((node) => {
        graphRef.current
          .centerAt(node.x, node.y, 500)
          .zoom(8, 500);
        setTimeout(() => {
          navigate(`nodes/${node.id}/resources`);
          setFocus(node);
        }, 500);
      })
  }, [graphRef, nodes, links, navigate]);

  return (
    <div>
      <div id="graph" className={`absolute z-10 ${focus
        ? "bg-theme-black opacity-50"
        : "bg-theme-gray-xlight"}`} />
      <div className="flex justify-center items-center h-screen">
        <Outlet />
      </div>
    </div>
  );
}