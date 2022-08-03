import { useEffect, useRef, useState } from "react";

import axios from "axios";
import url from "./globals";
import AddLinkForm from "./components/AddLinkForm";
import AddNodeForm from "./components/AddNodeForm";
import initializeGraph from "./functions/initializeGraph";
import Node from "./components/Node";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [focus, setFocus] = useState(null);

  const graphRef = useRef();
  if (!graphRef.current) {
    graphRef.current = initializeGraph(graphRef, setFocus);
  }

  const refresh = () => {
    axios
      .get(url + "/graph")
      .then((response) => {
        setNodes(response.data.nodes);
        setLinks(response.data.links);
        console.log(response);
      });
  }

  const addNode = (title) => {
    axios
      .post(url + "/graph/nodes", { title: title })
      .then((response) => {
        refresh();
        console.log(response);
      });
  }

  const addLink = (sourceTitle, targetTitle) => {
    axios
      .post(url + "/graph/links", {
        source: nodes.find((node) => node.title === sourceTitle).id,
        target: nodes.find((node) => node.title === targetTitle).id
      })
      .then((response) => {
        refresh();
        console.log(response);
      });
  }

  const deleteNode = (node) => {
    axios
      .delete(url + "/graph/nodes/" + node.id)
      .then((response) => {
        refresh();
        setFocus(null);
        console.log(response);
      });
  }

  useEffect(() => { refresh(); }, []);

  useEffect(() => {
    graphRef
      .current(document.getElementById("graph"))
      .graphData({ nodes: nodes, links: links });
  }, [nodes, links]);

  return (
    <div className="App">
      <AddNodeForm nodes={nodes} onSubmit={addNode} />
      <AddLinkForm nodes={nodes} links={links} onSubmit={addLink} />
      {focus == null ? <h1>click to focus</h1> :
        <div>
          <Node node={focus} />
          <button onClick={() => { setFocus(null); }}>exit focus</button>
          <button onClick={() => { deleteNode(focus); }}>delete node</button>
        </div>
      }
      <div id="graph" />
    </div>
  )
}