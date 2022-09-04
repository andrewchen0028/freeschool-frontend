import ForceGraph from "force-graph";
import { useEffect, useRef } from "react";

import Graph from "./Graph";

export default function GraphCanvas() {
  const graphRef = useRef();

  useEffect(() => {
    graphRef.current = ForceGraph()(document.getElementById("graph"))
      .linkDirectionalArrowLength(4.0)
      .linkDirectionalArrowRelPos(0.5)
      .nodeCanvasObject((node, ctx, globalScale) => {
        const fontSize = graphRef.current.zoom() * 4 / globalScale;
        const padding = 0.2;

        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#4285F4";
        ctx.fillText(node.id, node.x, node.y);

        node.__bckgDimensions = [ctx.measureText(node.id).width, fontSize]
          .map(n => n + fontSize * padding);
      })
      .nodePointerAreaPaint((node, color, ctx) => {
        ctx.fillStyle = color;
        node.__bckgDimensions && ctx.fillRect(
          node.x - node.__bckgDimensions[0] / 2,
          node.y - node.__bckgDimensions[1] / 2,
          ...node.__bckgDimensions
        );
      })
  }, []);

  return (
    <div id="app">
      <Graph graphRef={graphRef} />
    </div>
  );
}