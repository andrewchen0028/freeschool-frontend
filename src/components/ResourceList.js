import Resource from "./Resource"

function ResourceList({ resources }) {
  const buffer = []
  resources.forEach(resource => {
    buffer.push(<Resource key={resource.id} resource={resource} />)
  })
  return buffer
}

export default ResourceList