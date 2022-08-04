import { useEffect, useRef, useState } from "react";

import axios from "axios";
import url from "./globals";
import initializeGraph from "./functions/initializeGraph";
import NodeWindow from "./components/NodeWindow";
import { Box } from "@mui/system";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [focus, setFocus] = useState(null);

  const graph = useRef();
  graph.current = initializeGraph(graph, setFocus);

  const refresh = () => axios
    .get(url + "/graph")
    .then((response) => {
      setNodes(response.data.nodes);
      setLinks(response.data.links);
      setFocus(null);
      console.log(response);
    });

  const addNode = (title) => axios
    .post(url + "/nodes", { title: title })
    .then((response) => { refresh(); console.log(response); });

  const addLink = (sourceTitle, targetTitle) => axios
    .post(url + "/graph/links", {
      source: nodes.find((node) => node.title === sourceTitle).id,
      target: nodes.find((node) => node.title === targetTitle).id
    })
    .then((response) => { refresh(); console.log(response); });

  const deleteNode = (node) => axios
    .delete(url + "/nodes/" + node.id)
    .then((response) => { refresh(); console.log(response); });

  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    if (nodes) graph
      .current(document.getElementById("graph"))
      .graphData({ nodes: nodes, links: links });
  }, [nodes, links]);

  return (
    <div className="App">
      {focus == null ? <div /> :
        <NodeWindow id="node-window"
          addNode={addNode} addLink={addLink}
          delete={() => { deleteNode(focus); }}
          exit={() => { setFocus(null); }}
          focus={focus} nodes={nodes} links={links}
        />
      }
      <Box id="graph"
        sx={{
          position: "absolute",
          zIndex: 1300
        }} />
    </div>
  )
}
