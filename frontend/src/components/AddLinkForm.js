import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function AddLinkForm(props) {
  const [sourceTitle, setSourceTitle] = useState("");
  const [targetTitle, setTargetTitle] = useState("");
  const [sourceExists, setSourceExists] = useState(false);
  const [targetExists, setTargetExists] = useState(false);
  const [linkExists, setLinkExists] = useState(false);

  useEffect(() => {
    setSourceExists(props.nodes.some((node) => node.title === sourceTitle));
  }, [props.nodes, sourceTitle]);

  useEffect(() => {
    setTargetExists(props.nodes.some((node) => node.title === targetTitle));
  }, [props.nodes, targetTitle]);

  useEffect(() => {
    setLinkExists(props.links.some((link) =>
      link.source.title === sourceTitle && link.target.title === targetTitle
    ));
    console.log(props.links.some((link) =>
      link.source.title === sourceTitle && link.target.title === targetTitle
    ));
  }, [props.links, sourceTitle, targetTitle]);

  return (
    <Box component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" }, }}
      noValidate
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(sourceTitle, targetTitle);
        setSourceTitle("");
        setTargetTitle("");
      }}>
      {(!sourceExists && !targetExists && !linkExists) &&
        <div>
          <TextField
            id="addLinkFormSource"
            placeholder="Source Node Title"
            value={sourceTitle}
            onChange={(event) => {
              event.preventDefault();
              setSourceTitle(event.target.value);
            }} />
          <TextField
            id="addLinkFormTarget"
            placeholder="Target Node Title"
            value={targetTitle}
            onChange={(event) => {
              event.preventDefault();
              setTargetTitle(event.target.value);
            }} />
          <Button variant="contained" disabled={true}>submit</Button>
        </div>
      }

      {(linkExists) &&
        <div>
          <TextField error
            id="addLinkFormSource"
            label="Link already exists"
            placeholder="Source Node Title"
            value={sourceTitle}
            onChange={(event) => {
              event.preventDefault();
              setSourceTitle(event.target.value);
            }} />
          <TextField error
            id="addLinkFormTarget"
            label="Link already exists"
            placeholder="Target Node Title"
            value={targetTitle}
            onChange={(event) => {
              event.preventDefault();
              setTargetTitle(event.target.value);
            }} />
          <Button variant="contained" disabled={true}>submit</Button>
        </div>
      }

      {(!sourceExists && targetExists) &&
        <div>
          <TextField error
            id="addLinkFormSource"
            label="Source node not found"
            placeholder="Source Node Title"
            value={sourceTitle}
            onChange={(event) => {
              event.preventDefault();
              setSourceTitle(event.target.value);
            }} />
          <TextField
            id="addLinkFormTarget"
            placeholder="Target Node Title"
            value={targetTitle}
            onChange={(event) => {
              event.preventDefault();
              setTargetTitle(event.target.value);
            }} />
          <Button variant="contained" disabled={true}>submit</Button>
        </div>
      }

      {(sourceExists && !targetExists) &&
        <div>
          <TextField
            id="addLinkFormSource"
            placeholder="Source Node Title"
            value={sourceTitle}
            onChange={(event) => {
              event.preventDefault();
              setSourceTitle(event.target.value);
            }} />
          <TextField
            id="addLinkFormTarget"
            label="Target node not found"
            placeholder="Target Node Title"
            value={targetTitle}
            onChange={(event) => {
              event.preventDefault();
              setTargetTitle(event.target.value);
            }} />
          <Button variant="contained" disabled={true}>submit</Button>
        </div>
      }

      {(sourceExists && targetExists && !linkExists) &&
        <div>
          <TextField
            id="addLinkFormSource"
            placeholder="Source"
            value={sourceTitle}
            onChange={(event) => {
              event.preventDefault();
              setSourceTitle(event.target.value);
            }} />
          <TextField
            id="addLinkFormTarget"
            placeholder="Target"
            value={targetTitle}
            onChange={(event) => {
              event.preventDefault();
              setTargetTitle(event.target.value);
            }} />
          <Button variant="contained" type="submit">submit</Button>
        </div>
      }
    </Box>
  )
}