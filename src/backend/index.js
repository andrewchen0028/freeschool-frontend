const cors = require("cors")
const express = require("express")
const { v4: uuidv4 } = require("uuid")

const app = express()
app.use(express.json())
app.use(cors())

const graph = {
  "nodes": [{ id: uuidv4(), group: 0, title: "root" }],
  "links": []
}
const resources = {}

app.get("/api/graph", (_request, response) => {
  response.json(graph).status(200).end()
})

app.get("/api/nodes/:id/resources", (request, response) => {
  response.json(resources[request.params.id]).status(200).end()
})

app.post("/api/graph/nodes/", (request, response) => {
  if (graph.nodes.some((node) => node.title === request.body.title)) {
    response.status(400).end()
  } else {
    const node = {
      id: uuidv4(),
      group: request.body.group,
      title: request.body.title
    }
    const link = {
      source: request.body.sourceId,
      target: node.id,
      id: uuidv4()
    }
    graph.nodes = graph.nodes.concat(node)
    graph.links = graph.links.concat(link)
    response.json(node).status(200).end()
  }
})

app.post("/api/nodes/:id/resources", (request, response) => {
  const [nodeId, resourceId] = [request.params.id, uuidv4()]
  if (!resources[nodeId]) { resources[nodeId] = [] }
  resources[nodeId] = resources[nodeId].concat({
    id: resourceId,
    title: request.body.title,
    url: request.body.url
  })
  response.json(resources[nodeId][resourceId]).status(200).end()
})

app.delete("/api/graph/nodes/:id", (request, response) => {
  const id = request.params.id
  graph.nodes = graph.nodes.filter(node => node.id !== id)
  graph.links = graph.links.filter(link => link.source !== id)
  graph.links = graph.links.filter(link => link.target !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)