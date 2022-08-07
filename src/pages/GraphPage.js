import { useEffect, useRef } from "react"

import ForceGraph from "force-graph";

import GraphDataManager from "../components/GraphDataManager";

export default function GraphPage() {
  const graphRef = useRef();

  // Put graph functionality into GraphDataManager so we
  // can access graph data in the functions.
  useEffect(() => {
    graphRef.current = ForceGraph()(document.getElementById("graph"))
      .linkDirectionalArrowLength(4.0)
      .linkDirectionalArrowRelPos(0.5)
      .nodeCanvasObject((node, ctx, globalScale) => {
        const fontSize = 14 / globalScale;
        const textWidth = ctx.measureText(node.id).width;
        const bckgDimensions = [textWidth, fontSize]
          .map(n => n + fontSize * 0.2); // some padding

        ctx.font = `${fontSize}px Sans-Serif`;
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

        // to use in nodePointerAreaPaint
        node.__bckgDimensions = bckgDimensions;
      });
  }, []);

  // Note: try <div id="graph" /> in both GraphPage() and
  // in GraphDataManager() if rendering bug occurs.
  return <GraphDataManager graphRef={graphRef} />;
}