function Node(focus) {
  const node = focus.node
  return (
    <div>
      <h1>focus: {node.id}</h1>
    </div>
  )
}

export default Node