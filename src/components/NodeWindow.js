import { Box } from "@mui/system";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import url from "../globals";
import AddLinkForm from "./AddLinkForm";
import AddNodeForm from "./AddNodeForm";
import ResourceList from "./ResourceList";

export default function NodeWindow(props) {
  const focus = props.focus;

  const [resources, setResources] = useState([]);
  const [stagedResourceTitle, setStagedResourceTitle] = useState("");
  const [stagedResourceUrl, setStagedResourceUrl] = useState("");

  const addResource = (event) => {
    event.preventDefault();
    setStagedResourceUrl("");
    setStagedResourceTitle("");
    axios.post(url + "/nodes/" + focus.id + "/resources", {
      title: stagedResourceTitle,
      url: stagedResourceUrl
    }).then(response => {
      refresh();
      console.log(response);
    });
  }

  const refresh = useCallback(() => {
    let buffer = []
    axios.get(url + "/nodes/" + focus.id + "/resources")
      .then((response) => {
        response.data.forEach(resource => buffer.push(resource));
        console.log(response);
      })
      .then(() => { setResources(buffer); })
      .catch(() => { setResources([]); })
  }, [focus.id]);

  useEffect(() => { refresh(); }, [focus, refresh]);

  return (
    <Box
      sx={{
        bgcolor: "lightgray",
        position: "absolute",
        height: "50%",
        width: "50%",
        zIndex: 1400
      }}>
      <button onClick={props.exit}>exit</button>
      <button onClick={props.delete}>delete</button>
      <h1>{focus.title}</h1>
      <AddNodeForm
        nodes={props.nodes}
        onSubmit={props.addNode} />
      <AddLinkForm
        nodes={props.nodes}
        links={props.links}
        onSubmit={props.addLink} />
      <ResourceList resources={resources} />
      <form onSubmit={addResource}>
        <input value={stagedResourceTitle}
          onChange={(event) => { setStagedResourceTitle(event.target.value); }}
          placeholder="title" />
        <input value={stagedResourceUrl}
          onChange={(event) => { setStagedResourceUrl(event.target.value); }}
          placeholder="url" />
        <button type="submit">submit resource</button>
      </form>
    </Box>
  )
}