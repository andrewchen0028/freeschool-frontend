import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import url from "../globals";
import CardList from "../components/CardList";

export default function NodePage() {
  const [items, setItems] = useState([]);
  const [types, setTypes] = useState("resources");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios
      .get(url + "/nodes/" + params.id + "/" + types)
      .then((response) => {
        let itemsBuffer = [];
        response.data.forEach((item) => { itemsBuffer.push(item) });
        setItems(itemsBuffer);
      });
  }, [types, params.id]);

  const exitNode = () => { navigate(`/`); }
  const deleteNode = () => {
    axios
      .delete(url + "/nodes/" + params.id)
      .then((_response) => { exitNode(); });
  }

  return (
    <div id="node-page-div">
      <h1>{params.id} node page</h1>
      <button onClick={exitNode}>exit node</button>
      <button onClick={deleteNode}>delete node</button>

      <select id="item-type-select"
        name="item-type"
        value={types}
        onChange={(event) => { setTypes(event.target.value) }}>
        <option value="resources" defaultChecked>resources</option>
        <option value="inlinks">inlinks</option>
        <option value="outlinks">outlinks</option>
      </select>

      <CardList items={items} types={types} setTypes={setTypes} />
    </div>
  )
}