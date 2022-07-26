import { useEffect, useState } from "react";

import renderGraph from "./functions/renderGraph"
import axios from 'axios'

function App() {
  const url = "http://localhost:3001/api/"
  const [graph, setGraph] = useState({ nodes: [], links: [] })

  const refresh = () =>
    axios.get(url + 'graph/').then((graph) => { setGraph(graph.data) })

  useEffect(() => { refresh() }, [])
  useEffect(() => { renderGraph(graph, () => { }) }, [graph])

  return (
    <div className="App">
      <button onClick={() => refresh()}>Refresh</button>
      <div id='graph' />
    </div>
  );
}

export default App;
