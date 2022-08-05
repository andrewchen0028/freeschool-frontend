import { useCallback, useEffect, useState } from "react";
import LinkCard from "./LinkCard";
import ResourceCard from "./ResourceCard";

export default function CardList(props) {
  const [cards, setCards] = useState([]);

  const refreshCards = useCallback(() => {
    let cardsBuffer = [];
    props.items.forEach((item) => {
      switch (props.types) {
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
            setFocus={props.setFocus} />
        );
        case "outlinks": return cardsBuffer.push(
          <LinkCard id={"link-card-" + item.id}
            key={item.id}
            type="out"
            link={item}
            setFocus={props.setFocus} />
        );
        default: return;
      }
    })
    setCards(cardsBuffer);
  }, [props]);

  useEffect(() => { refreshCards(); }, [props, refreshCards]);

  return (
    <div id="card-list-div">
      {cards}
    </div>
  )
}