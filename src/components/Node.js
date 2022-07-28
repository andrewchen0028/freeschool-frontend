import axios from "axios"
import url from "../globals"

import { useCallback, useEffect, useState } from "react"
import ResourceList from "./ResourceList"

function Node(focus) {
  const node = focus.node
  const [resources, setResources] = useState([])
  const [stagedResourceTitle, setStagedResourceTitle] = useState("")
  const [stagedResourceUrl, setStagedResourceUrl] = useState("")

  const addResource = (event) => {
    event.preventDefault()
    setStagedResourceUrl("")
    setStagedResourceTitle("")
    axios.post(url + "/nodes/" + node.id + "/resources", {
      title: stagedResourceTitle,
      url: stagedResourceUrl
    }).then(response => {
      refresh()
      console.log("addResource():", response)
    })
  }

  const refresh = useCallback(() => {
    let buffer = []
    axios.get(url + "/nodes/" + node.id + "/resources")
      .then((response) => {
        response.data.forEach(resource => buffer.push(resource))
        console.log("refresh():", response)
      })
      .then(() => setResources(buffer))
      .catch(() => setResources([]))
  }, [node.id])

  useEffect(() => refresh(), [node, refresh])

  return (
    <div>
      <h1>focus: {node.title}</h1>
      <ResourceList resources={resources} />
      <form onSubmit={addResource}>
        <input value={stagedResourceTitle}
          onChange={(event) => setStagedResourceTitle(event.target.value)}
          placeholder="title" />
        <input value={stagedResourceUrl}
          onChange={(event) => setStagedResourceUrl(event.target.value)}
          placeholder="url" />
        <button type="submit">submit resource</button>
      </form>
    </div>
  )
}

export default Node