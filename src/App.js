import { useEffect, useState } from "react"

import renderGraph from "./functions/renderGraph"
import axios from "axios"
import Node from "./components/Node"
import url from "./globals"

function App() {
  const [graph, setGraph] = useState({ nodes: [], links: [] })
  const [focus, setFocus] = useState(null)
  const [stagedNodeTitle, setStagedNodeTitle] = useState("")

  const refresh = () => axios
    .get(url + "/graph")
    .then((response) => { setGraph(response.data) })

  const addNode = () => axios
    .post(url + "/graph/nodes", {
      sourceId: focus.id,
      title: stagedNodeTitle
    })
    .then((response) => {
      refresh()
      setFocus(response.data)
    })

  const deleteNode = (node) => axios
    .delete(url + "/graph/nodes/" + node.id)
    .then(() => {
      refresh()
      setFocus(null)
    })

  useEffect(() => { refresh() }, [])
  useEffect(() => { renderGraph(graph, setFocus) }, [graph])

  return (
    <div className="App">
      <button onClick={() => refresh()}>refresh graph</button>
      {focus == null ? <h1>click a node to focus</h1> :
        <div>
          <Node node={focus} />
          <form onSubmit={addNode}>
            <input value={stagedNodeTitle}
              onChange={(event) => setStagedNodeTitle(event.target.value)}
              placeholder="title" />
            <button type="submit">submit node</button>
          </form>
          <button onClick={() => deleteNode(focus)}>delete node</button>
          <button onClick={() => setFocus(null)}>exit focus</button>
        </div>}
      <div id="graph" />
    </div>
  )
}

export default App