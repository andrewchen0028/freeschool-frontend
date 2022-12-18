import ForceGraph from "force-graph";
import { useCallback, useEffect, useRef } from "react";

import Graph from "./Graph";
import TopBar from "./TopBar";
import { themeColors } from "../globals";

export default function GraphCanvas() {
  const graphRef = useRef();

  const paintRing = useCallback((node, color, ctx, radius) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2, false);
    ctx.fill();
  }, []);

  useEffect(() => {
    graphRef.current = ForceGraph()(document.getElementById("graph"))
      .linkDirectionalArrowLength(4.0)
      .linkDirectionalArrowRelPos(0.5)
      .nodeCanvasObject((node, ctx, globalScale) => {
        const fontSize = graphRef.current.zoom() * 4 / globalScale;
        const textWidth = ctx.measureText(node.id).width;

        paintRing(node, themeColors.gray.light, ctx, textWidth / 2 + 2);
        paintRing(node, themeColors.white, ctx, textWidth / 2 + 1);

        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = themeColors.blue.light;
        ctx.fillText(node.id, node.x, node.y);

        node.__bckgRadius = textWidth / 2 + 2;
      })
      .nodePointerAreaPaint((node, color, ctx) => {
        paintRing(node, color, ctx, node.__bckgRadius);
      });
  }, [paintRing]);

  return (
    <div id="app" className="absolute h-screen w-screen overflow-hidden">
      <TopBar />
      <Graph graphRef={graphRef} />
    </div>
  );
}