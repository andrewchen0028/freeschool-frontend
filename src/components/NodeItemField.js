import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../globals.js";

/**
 * TODO:
 * Remake with staged field values like this
 * https://stackoverflow.com/questions/50617966/axios-post-form-with-reactjs
 */
function ResourceField() {
  const [state, setState] = useState({ title: "", url: "" });
  const params = useParams();

  const onChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const { title, url } = state; // TODO: WOW DOES THIS DESTRUCTURING REALLY WORK?
    console.log("url", url);
    console.log(`${url}/nodes/${params.id}/resources`);
    axios.post(
      `${url}/nodes/${params.id}/resources`,
      { title, url }
    ).then((response) => {
      // ACCESS THE RESULTS HERE
      console.log("title", title);
      console.log("node", url);
    });
  }

  // const addResource = (event) => {
  //   event.preventDefault();
  //   console.log("Adding resource", event, url);
  //   // axios.post(`${url}/nodes/${params.id}/resources`, title)
  //   //   .then((response) => { console.log(response); });
  // }

  return (
    <div>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <input required className="rounded-sm
            border border-solid border-theme-gray-xdark"
          type="text" name="title" id="title"
          placeholder="Resource Title" value={state.title}
          onChange={onChange} />
        <input required className="rounded-sm
            border border-solid border-theme-gray-xdark"
          type="text" name="url" id="url"
          placeholder="Resource URL" value={state.url}
          onChange={onChange} />
        <input className="rounded-sm border border-solid
          border-theme-gray-xdark" type="submit" value="Add Resource" />
      </form>
    </div>
  );
}

function InlinkField() {
  return (
    <div>
      InlinkField
    </div>
  )
}

function OutlinkField() {
  return (
    <div>
      outlinkField
    </div>
  )
}

export default function NodeItemField({ cardType }) {
  switch (cardType) {
    case "resources": return (<ResourceField />);
    case "inlinks": return (<InlinkField />);
    case "outlinks": return (<OutlinkField />);
    default: return (<ResourceField />);
  }
}