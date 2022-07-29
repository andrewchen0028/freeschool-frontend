import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function AddNodeForm(props) {
  const [stagedNodeTitle, stageNodeTitle] = useState("")

  return (
    <Box component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" }, }}
      noValidate
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault()
        props.onSubmit(stagedNodeTitle)
        stageNodeTitle("")
      }}>
      {(props.nodes.some((node) => node.title === stagedNodeTitle)) ? (
        <div>
          <TextField error
            id="outlined-error-helper-text"
            label="Title is already taken"
            placeholder="Hello World"
            value={stagedNodeTitle}
            onChange={(event) => {
              event.preventDefault()
              stageNodeTitle(event.target.value)
            }} />
          <Button variant="contained" disabled={true}>submit</Button>
        </div>
      ) : (
        <div>
          <TextField id="normal-helper-text"
            placeholder="Hello World"
            value={stagedNodeTitle}
            onChange={(event) => {
              event.preventDefault()
              stageNodeTitle(event.target.value)
            }} />
          <Button variant="contained" type="submit">submit</Button>
        </div>
      )}
    </Box>
  )
}