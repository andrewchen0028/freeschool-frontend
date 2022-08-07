import { useEffect, useState } from "react";

import LinkCard from "./LinkCard";
import ResourceCard from "./ResourceCard";

export default function CardList({ items, types, setTypes }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let cardsBuffer = [];
    items.forEach((item) => {
      switch (types) {
        case "resources": return cardsBuffer.push(
          <ResourceCard id={"resource-card-" + item.id}
            key={item.id}
            resource={item} />
        );
        case "inlinks": return cardsBuffer.push(
          <LinkCard id={"link-card-" + item.id}
            key={item.id}
            type="in"
            link={item}
            setTypes={setTypes} />
        );
        case "outlinks": return cardsBuffer.push(
          <LinkCard id={"link-card-" + item.id}
            key={item.id}
            type="out"
            link={item}
            setTypes={setTypes} />
        );
        default: return;
      }
    })
    setCards(cardsBuffer);
  }, [items, types, setTypes]);

  return (
    <div id="card-list-div">
      {cards}
    </div>
  )
}