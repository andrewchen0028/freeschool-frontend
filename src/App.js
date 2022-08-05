import { useEffect, useRef, useState } from "react";
import axios from "axios";
import url from "./globals";
import NodeWindow from "./components/NodeWindow";
import initializeGraph from "./functions/initializeGraph";

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
    });

  const deleteNode = (node) => axios
    .delete(url + "/nodes/" + node.id)
    .then((_response) => { refresh(); });

  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    if (nodes) graph
      .current(document.getElementById("graph"))
      .graphData({ nodes: nodes, links: links });
  }, [nodes, links]);

  return (
    <div className="App">
      {focus ?
        <div id="node-window-styling-div"
          style={{
            borderStyle: "solid",
            backgroundColor: "lightgray",
            opacity: "100%",
            position: "absolute",
            zIndex: 2
          }}>
          <NodeWindow id="node-window"
            nodes={nodes}
            links={links}
            deleteNode={deleteNode}
            focus={focus}
            setFocus={setFocus} />
        </div> : <div />}
      <div id="graph" style={{ position: "absolute", zIndex: 1 }} />
    </div>
  )
}

// const addNode = (title) => axios
// .post(url + "/nodes", { title: title })
// .then((response) => { refresh(); console.log(response); });

// const addLink = (sourceTitle, targetTitle) => axios
// .post(url + "/graph/links", {
//   source: nodes.find((node) => node.title === sourceTitle).id,
//   target: nodes.find((node) => node.title === targetTitle).id
// })
// .then((response) => { refresh(); console.log(response); });

// {focus == null ? <div /> :
// <NodeWindow id="node-window"
//   addNode={addNode} addLink={addLink}
//   delete={() => { deleteNode(focus); }}
//   exit={() => { setFocus(null); }}
//   focus={focus} nodes={nodes} links={links}
// />
// }