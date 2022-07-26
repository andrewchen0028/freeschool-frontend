const cors = require("cors")
const express = require("express")

const app = express()
app.use(express.json())
app.use(cors())

const graph = {
  "nodes": [{ id: 0, group: 1 }, { id: 1, group: 1 }],
  "links": [{ id: 2, source: 0, target: 1 }]
}

const resources = {
  "0": [{ id: 3, title: "netflix" }, { id: 4, title: "google" }],
  "1": [{ id: 5, title: "youtube" }, { id: 6, title: "reddit" }]
}

app.get('/api/graph', (_request, response) => {
  response.json(graph).status(200).end()
})

app.get('/api/nodes/:id/resources', (request, response) => {
  response.json(resources[request.params.id]).status(200).end()
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

app.delete('/api/graph/nodes/:id', (request, response) => {
  const id = Number(request.params.id)
  graph.nodes = graph.nodes.filter(node => node.id !== id)
  graph.links = graph.links.filter(link => link.source !== id)
  graph.links = graph.links.filter(link => link.target !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)
