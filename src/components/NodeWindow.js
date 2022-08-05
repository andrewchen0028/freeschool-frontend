import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import url from "../globals";
import CardList from "./CardList";

export default function NodeWindow(props) {
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState("resources");

  const refreshItems = useCallback(() => {
    axios
      .get(url + "/nodes/" + props.focus.id + "/" + types)
      .then((response) => {
        let itemsBuffer = [];
        response.data.forEach((item) => { itemsBuffer.push(item) });
        setItems(itemsBuffer);
      });
  }, [types, props.focus.id]);

  useEffect(() => { setTypes("resources"); }, [props.focus]);

  useEffect(() => { refreshItems(); }, [refreshItems]);

  return (
    <div id="node-window-div">
      <h1>{props.focus.title}</h1>
      <button onClick={() => props.setFocus(null)}>exit</button>
      <button onClick={() => props.deleteNode(props.focus)}>delete</button>

      <select id="item-type-select"
        name="item-type"
        value={types}
        onChange={(event) => { setTypes(event.target.value) }}>
        <option value="resources" defaultChecked>resources</option>
        <option value="inlinks">inlinks</option>
        <option value="outlinks">outlinks</option>
      </select>

      <CardList
        focus={props.focus}
        setFocus={props.setFocus}
        items={items}
        types={types} />
    </div>
  )

}

// const [stagedResourceTitle, setStagedResourceTitle] = useState("");
// const [stagedResourceUrl, setStagedResourceUrl] = useState("");

// const addResource = (event) => {
//   event.preventDefault();
//   setStagedResourceUrl("");
//   setStagedResourceTitle("");
//   axios.post(url + "/nodes/" + focus.id + "/resources", {
//     title: stagedResourceTitle,
//     url: stagedResourceUrl
//   }).then(response => {
//     refresh();
//     console.log(response);
//   });
// }

// <AddNodeForm
//   nodes={props.nodes}
//   onSubmit={props.addNode} />
// <AddLinkForm
//   nodes={props.nodes}
//   links={props.links}
//   onSubmit={props.addLink} />
// <ResourceList resources={resources} />
// <form onSubmit={addResource}>
//   <input value={stagedResourceTitle}
//     onChange={(event) => { setStagedResourceTitle(event.target.value); }}
//     placeholder="title" />
//   <input value={stagedResourceUrl}
//     onChange={(event) => { setStagedResourceUrl(event.target.value); }}
//     placeholder="url" />
//   <button type="submit">submit resource</button>
// </form>