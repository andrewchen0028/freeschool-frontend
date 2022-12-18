export default function NodeHeaderContent({ title }) {
  return (
    <div id="node-header-content" className="flex flex-col grow">
      {/* Path and author-timestamp */}
      <div className="text-sm">
        <div className="inline-block m-0 mr-4">
          name of supernode used to find here{"\u0009"}
        </div>
        <div className="inline-block m-0 opacity-50">
          author - timestamp
        </div>
      </div>

      {/* Node title */}
      <h1 className="text-xl m-0">{title}</h1>
    </div>
  )
}