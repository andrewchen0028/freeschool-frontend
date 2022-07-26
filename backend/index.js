const cors = require("cors")
const express = require("express")

const app = express()
app.use(express.json())
app.use(cors())

const graph = {
  "nodes": [
    { id: 0, group: 1 },
    { id: 1, group: 1 }
  ],
  "links": [{ id: 2, source: 0, target: 1 }]
}

app.get('/api/graph', (_request, response) => {
  response.json(graph).status(200).end()
})

const generateIdPair = () => {
  const maxNodeId = graph.nodes.length > 0 ?
    Math.max(...graph.nodes.map(node => node.id)) : 0
  const maxLinkId = graph.links.length > 0 ?
    Math.max(...graph.links.map(link => link.id)) : 0
  return [maxNodeId + 1, maxLinkId + 1]
}

app.post('/api/graph/nodes/', (request, response) => {
  const [nodeId, linkId] = generateIdPair()
  const node = { id: nodeId, group: request.body.group }
  const link = { source: request.body.id, target: nodeId, id: linkId }
  graph.nodes = graph.nodes.concat(node)
  graph.links = graph.links.concat(link)
  response.json(node).status(200).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)
