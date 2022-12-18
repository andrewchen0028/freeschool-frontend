import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NodeHeaderContent from "./NodeHeaderContent";
import NodeItemField from "./NodeItemField";
import NodeItemList from "./NodeItemList";
import NodeItemSelector from "./NodeItemSelector";
import NodeScoreBlock from "./NodeScoreBlock";
import NodeWindowExitButton from "./NodeWindowExitButton";

export default function NodeWindow() {
  const [cardType, setCardType] = useState("");

  const params = useParams();

  // Reset card type upon navigating to a new node
  useEffect(() => { setCardType("resources"); }, [params.id]);

  return (
    // NodeWindow container
    <div id="node-window"
      className="border-x border-theme-gray-dark bg-theme-white
      absolute h-screen w-4/5 z-20
      flex flex-col items-start gap-4 p-4">

      <div id="node-header" className="flex flex-row self-stretch gap-4">
        <NodeScoreBlock />
        <NodeHeaderContent title={params.id} />
        <NodeWindowExitButton />
      </div>

      <NodeItemSelector cardType={cardType} setCardType={setCardType} />
      <NodeItemField cardType={cardType} />
      <NodeItemList />

    </div >
  );
}