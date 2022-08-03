import { useEffect, useRef, useState } from "react";

import axios from "axios";
import url from "./globals";
import initializeGraph from "./functions/initializeGraph";
import NodeWindow from "./components/NodeWindow";
import { Box } from "@mui/system";

export default function App() {
  const [graph, setGraph] = useState({ nodes: [], links: [] });
  const [focus, setFocus] = useState(null);

  const graphRef = useRef();
  graphRef.current = initializeGraph(graphRef, setFocus);

  const refresh = () => axios
    .get(url + "/graph")
    .then((response) => {
      setGraph({
        nodes: response.data.nodes,
        links: response.data.links
      });
      setFocus(null);
      console.log(response);
    });

  const addNode = (title) => axios
    .post(url + "/graph/nodes", { title: title })
    .then((response) => {
      refresh();
      console.log(response);
    });

  const addLink = (sourceTitle, targetTitle) => axios
    .post(url + "/graph/links", {
      source: graph.nodes.find((node) => node.title === sourceTitle).id,
      target: graph.nodes.find((node) => node.title === targetTitle).id
    })
    .then((response) => {
      refresh();
      console.log(response);
    });

  const deleteNode = (node) => axios
    .delete(url + "/graph/nodes/" + node.id)
    .then((response) => {
      refresh();
      console.log(response);
    });

  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    if (graph.nodes) {
      graphRef
        .current(document.getElementById("graph"))
        .graphData({ nodes: graph.nodes, links: graph.links });
    }
  }, [graph]);

  return (
    <div className="App">
      {focus == null ? <div /> :
        <NodeWindow id="node-window"
          addNode={addNode} addLink={addLink}
          delete={() => { deleteNode(focus); }}
          exit={() => { setFocus(null); }}
          focus={focus} nodes={graph.nodes} links={graph.links}
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
