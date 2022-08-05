import { useEffect, useState } from "react";
import axios from "axios";
import url from "../globals";

export default function LinkCard(props) {
  const [otherNode, setOtherNode] = useState();

  useEffect(() => {
    let nodeId;
    switch (props.type) {
      case "in": nodeId = props.link.source; break;
      case "out": nodeId = props.link.target; break;
      default: break;
    }
    axios
      .get(url + "/nodes/" + nodeId)
      .then((response) => { setOtherNode(response.data); })
  }, [props])

  // TODO: Clean this up at some point. "Preposition" function is really dumb.
  const preposition = () => {
    switch (props.type) {
      case "in": return "from";
      case "out": return "to";
      default: return;
    }
  }

  const handleClick = (event) => {
    event.preventDefault();
    props.setFocus(otherNode);
  }

  return (
    <div id={"link-card-" + props.link.id}>
      {otherNode && <p>
        {preposition()} <a href="/" onClick={handleClick}>{otherNode.title}</a>
      </p>}
    </div >
  )
}