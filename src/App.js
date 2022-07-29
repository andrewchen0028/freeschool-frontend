import { useEffect, useState } from "react";

import renderGraph from "./functions/renderGraph";
import axios from "axios";
import Node from "./components/Node";
import url from "./globals";
import AddNodeForm from "./components/AddNodeForm";
import AddLinkForm from "./components/AddLinkForm";

function App() {
  const [graph, setGraph] = useState({ nodes: [], links: [] });
  const [focus, setFocus] = useState(null);

  const refresh = () => axios
    .get(url + "/graph")
    .then((response) => {
      setGraph(response.data);
      console.log("refresh():", response);
    });

  const addSingleNode = (title) => axios
    .post(url + "/graph/nodes", { title: title })
    .then((response) => {
      refresh();
      console.log("addSingleNode():", response);
    });

  const addSingleLink = (sourceTitle, targetTitle) => {
    const sourceID = graph.nodes.find((node) => node.title === sourceTitle).id;
    const targetID = graph.nodes.find((node) => node.title === targetTitle).id;
    axios
      .post(url + "/graph/links", { source: sourceID, target: targetID })
      .then((response) => {
        refresh();
        console.log("addSingleLink():", response);
      });
  }


  const deleteNode = (node) => axios
    .delete(url + "/graph/nodes/" + node.id)
    .then((response) => {
      refresh();
      setFocus(null);
      console.log("deleteNode():", response);
    });


  useEffect(() => { refresh(); }, []);

  useEffect(() => { renderGraph(graph, setFocus); }, [graph]);

  return (
    <div className="App">
      <button onClick={() => { refresh(); }}>refresh graph</button>
      <AddNodeForm nodes={graph.nodes} onSubmit={addSingleNode} />
      <AddLinkForm nodes={graph.nodes}
        links={graph.links}
        onSubmit={addSingleLink} />
      {focus == null ? <h1>click a node to focus</h1> :
        <div>
          <Node node={focus} />
          <button onClick={() => { deleteNode(focus); }}>delete node</button>
          <button onClick={() => { setFocus(null); }}>exit focus</button>
        </div>}
      <div id="graph" />
    </div>
  )
}

export default App;