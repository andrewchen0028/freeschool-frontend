import { useEffect, useState } from "react";
import axios from "axios";
import url from "../globals";

export default function LinkCard(props) {
  const [object, setObject] = useState();

  useEffect(() => {
    let nodeId;
    switch (props.type) {
      case "in": nodeId = props.link.source; break;
      case "out": nodeId = props.link.target; break;
      default: break;
    }
    axios
      .get(url + "/nodes/" + nodeId)
      .then((response) => { setObject(response.data[0]); })
  }, [props])

  const preposition = () => {
    switch (props.type) {
      case "in": return "from";
      case "out": return "to";
      default: return;
    }
  }

  const handleClick = (event) => {
    event.preventDefault();
    props.setFocus(object);
  }

  return (
    <div id={"link-card-" + props.link.id}>
      {object && <p>
        {preposition()} <a href="/" onClick={handleClick}>{object.title}</a>
      </p>}
    </div >
  )
}