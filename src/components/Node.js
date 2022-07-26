import axios from "axios"
import url from "../globals"

import { useEffect, useState } from "react"

function Node(focus) {
  const node = focus.node
  const [resources, setResources] = useState([])

  useEffect(() => {
    let buffer = []
    axios.get(url + '/nodes/' + node.id + '/resources')
      .then((response) => response.data.forEach(resource =>
        buffer.push(<h1 key={resource.id}>{resource.title}</h1>)
      ))
      .then(() => setResources(buffer))
      .catch(() => setResources([]))
  }, [node]
  )

  return (
    <div>
      <h1>focus: {node.id}</h1>
      {resources}
    </div>
  )
}

export default Node