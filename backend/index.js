const cors = require("cors")
const express = require("express")

const app = express()
app.use(express.json())
app.use(cors())

const graph = {
  "nodes": [{ id: 0, group: 1 }, { id: 1, group: 2 }],
  "links": [{ id: 2, source: 0, target: 1 }]
}

app.get('/api/graph', (_request, response) => {
  response.json(graph).status(200).end()
})

const PORT = 3001
app.listen(PORT)
console.log(`server running on port ${PORT}`)
