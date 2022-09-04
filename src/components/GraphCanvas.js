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
        const fontSize = 14 / globalScale;
        const bckgDimensions = [ctx.measureText(node.id).width, fontSize]
          .map(n => n + fontSize * 0.2);
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillRect(
          node.x - bckgDimensions[0] / 2,
          node.y - bckgDimensions[1] / 2,
          ...bckgDimensions);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#4285F4";
        ctx.fillText(node.id, node.x, node.y);
      })
  }, []);

  return (
    <div id="app">
      <Graph graphRef={graphRef} />
    </div>
  );
}