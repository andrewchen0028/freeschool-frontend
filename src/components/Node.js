import axios from "axios"
import url from "../globals"

import { useEffect, useState } from "react"
import Resource from "./Resource"

function Node(focus) {
  const node = focus.node
  const [resources, setResources] = useState([])

  useEffect(() => {
    let buffer = []
    axios.get(url + '/nodes/' + node.id + '/resources')
      .then((response) => response.data.forEach(resource =>
        buffer.push(<Resource key={resource.id} resource={resource} />)
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