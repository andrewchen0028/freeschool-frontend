import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import url from "../globals";

export default function LinkCard({ type, link, setTypes }) {
  const [otherNode, setOtherNode] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    let nodeId;
    switch (type) {
      case "in": nodeId = link.source; break;
      case "out": nodeId = link.target; break;
      default: break;
    }
    axios
      .get(url + "/nodes/" + nodeId)
      .then((response) => { setOtherNode(response.data); })
  }, [type, link])

  // TODO: Clean this up at some point. "Preposition" function is really dumb.
  const preposition = () => {
    switch (type) {
      case "in": return "from";
      case "out": return "to";
      default: return;
    }
  }

  const handleClick = (event) => {
    event.preventDefault();
    setTypes("resources");
    navigate(`/nodes/${otherNode.id}`);
  }

  return (
    <div id={"link-card-" + link.id}>
      {otherNode && <p>
        {preposition()} <a href="/" onClick={handleClick}>{otherNode.id}</a>
      </p>}
    </div >
  )
}