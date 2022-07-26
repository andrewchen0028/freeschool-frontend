import { useEffect, useState } from "react";

import renderGraph from "./functions/renderGraph"
import axios from 'axios'

function App() {
  const url = "http://localhost:3001/api/"
  const [graph, setGraph] = useState({ nodes: [], links: [] })
  const [focus, setFocus] = useState(null)

  const refresh = () =>
    axios.get(url + 'graph/').then((graph) => { setGraph(graph.data) })

  useEffect(() => { refresh() }, [])
  useEffect(() => { renderGraph(graph, setFocus) }, [graph])

  return (
    <div className="App">
      <button onClick={() => refresh()}>refresh graph</button>
      {focus == null ? <h1>click a node to focus</h1> :
        <div>
          <h1>focused on node {focus.id}</h1>
          <button onClick={() => setFocus(null)}>exit focus</button>
        </div>}
      <div id='graph' />
    </div>
  );
}

export default App;
