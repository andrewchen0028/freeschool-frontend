import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function AddLinkForm(props) {
  const [source, setSource] = useState("")
  const [target, setTarget] = useState("")
  const [sourceExists, setSourceExists] = useState(false)
  const [targetExists, setTargetExists] = useState(false)
  const [linkExists, setLinkExists] = useState(false)

  useEffect(() => {
    setSourceExists(props.nodes.some((node) => node.title === source))
    console.log(props.nodes.some((node) => node.title === source))
  }, [props.nodes, source])
  useEffect(() => {
    setTargetExists(props.nodes.some((node) => node.title === target))
    console.log(props.nodes.some((node) => node.title === target))
  }, [props.nodes, target])
  useEffect(() => {
    setLinkExists(props.links.some((link) =>
      link.source === source && link.target === target
    ))
    console.log(props.links.some((link) =>
      link.source === source && link.target === target
    ))
  }, [props.links, source, target])

  return (
    <Box component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" }, }}
      noValidate
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault()
        props.onSubmit(source, target)
        setSource("")
        setTarget("")
      }}>

      {(!sourceExists && !targetExists && !linkExists) &&
        <div>
          <TextField
            id="addLinkFormSource"
            placeholder="Source Node Title"
            value={source}
            onChange={(event) => {
              event.preventDefault()
              setSource(event.target.value)
            }} />
          <TextField
            id="addLinkFormTarget"
            placeholder="Target Node Title"
            value={target}
            onChange={(event) => {
              event.preventDefault()
              setTarget(event.target.value)
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
            value={source}
            onChange={(event) => {
              event.preventDefault()
              setSource(event.target.value)
            }} />
          <TextField error
            id="addLinkFormTarget"
            label="Link already exists"
            placeholder="Target Node Title"
            value={target}
            onChange={(event) => {
              event.preventDefault()
              setTarget(event.target.value)
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
            value={source}
            onChange={(event) => {
              event.preventDefault()
              setSource(event.target.value)
            }} />
          <TextField
            id="addLinkFormTarget"
            placeholder="Target Node Title"
            value={target}
            onChange={(event) => {
              event.preventDefault()
              setTarget(event.target.value)
            }} />
          <Button variant="contained" disabled={true}>submit</Button>
        </div>
      }

      {(sourceExists && !targetExists) &&
        <div>
          <TextField
            id="addLinkFormSource"
            placeholder="Source Node Title"
            value={source}
            onChange={(event) => {
              event.preventDefault()
              setSource(event.target.value)
            }} />
          <TextField
            id="addLinkFormTarget"
            label="Target node not found"
            placeholder="Target Node Title"
            value={target}
            onChange={(event) => {
              event.preventDefault()
              setTarget(event.target.value)
            }} />
          <Button variant="contained" disabled={true}>submit</Button>
        </div>
      }

      {(sourceExists && targetExists && !linkExists) &&
        <div>
          <TextField
            id="addLinkFormSource"
            placeholder="Source"
            value={source}
            onChange={(event) => {
              event.preventDefault()
              setSource(event.target.value)
            }} />
          <TextField
            id="addLinkFormTarget"
            placeholder="Target"
            value={target}
            onChange={(event) => {
              event.preventDefault()
              setTarget(event.target.value)
            }} />
          <Button variant="contained" type="submit">submit</Button>
        </div>
      }
    </Box>
  )
}