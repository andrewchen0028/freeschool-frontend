import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

// DEPRECATED
export default function AddNodeForm(props) {
  const [stagedTitle, setStagedTitle] = useState("");

  return (
    <Box component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" }, }}
      noValidate
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(stagedTitle);
        setStagedTitle("");
      }}>
      {(props.nodes.some((node) => node.title === stagedTitle)) ? (
        <div>
          <TextField error
            id="outlined-error-helper-text"
            label="Title is already taken"
            placeholder="Node title"
            value={stagedTitle}
            onChange={(event) => {
              event.preventDefault();
              setStagedTitle(event.target.value);
            }} />
          <Button variant="contained" disabled={true}>submit</Button>
        </div>
      ) : (
        <div>
          <TextField id="normal-helper-text"
            placeholder="Node title"
            value={stagedTitle}
            onChange={(event) => {
              event.preventDefault();
              setStagedTitle(event.target.value);
            }} />
          <Button variant="contained" type="submit">submit</Button>
        </div>
      )}
    </Box>
  )
}