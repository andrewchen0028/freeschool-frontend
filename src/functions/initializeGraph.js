import ForceGraph from "force-graph";

export default function initializeGraph(graph, setFocus) {
  graph.current = ForceGraph();
  graph.current
    .linkDirectionalArrowLength(4)
    .linkDirectionalArrowRelPos(0.5)
    .onNodeClick((node) => { setFocus(node); })
    .nodeCanvasObject((node, ctx, globalScale) => {
      const fontSize = 14 / globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      const textWidth = ctx.measureText(node.id).width;
      const bckgDimensions =
        [textWidth, fontSize]
          .map(n => n + fontSize * 0.2); // some padding

      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillRect(
        node.x - bckgDimensions[0] / 2,
        node.y - bckgDimensions[1] / 2,
        ...bckgDimensions
      );
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = node.color;
      ctx.fillText(node.id, node.x, node.y);

      node.__bckgDimensions = bckgDimensions; // to use in nodePointerAreaPaint
    });

  return graph.current;
}