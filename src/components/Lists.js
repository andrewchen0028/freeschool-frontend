import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { InlinkCard, OutlinkCard, ResourceCard } from "./Cards";
import { url } from "../globals";

export function InlinkList() {
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${url}/nodes/${params.id}/inlinks`)
      .then((response) => {
        setList(response.data.reduce((buffer, link) => buffer.push(
          <InlinkCard key={link.id} link={link} />
        ) && buffer, []));
      });
  }, [params.id, navigate]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1em",
      marginTop: "1em",
      marginBottom: "1em",
      overflowY: "auto",
      alignItems: "stretch"
    }}>
      {list}
    </div>
  );
}

export function OutlinkList() {
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${url}/nodes/${params.id}/outlinks`)
      .then((response) => {
        setList(response.data.reduce((buffer, link) => buffer.push(
          <OutlinkCard key={link.id} link={link} />
        ) && buffer, []));
      });
  }, [params.id, navigate]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "1em",
      marginTop: "1em",
      marginBottom: "1em",
      overflowY: "auto",
      alignItems: "stretch"
    }}>
      {list}
    </div>
  );
}

export function ResourceList() {
  const [list, setList] = useState([]);

  const params = useParams();

  useEffect(() => {
    axios.get(`${url}/nodes/${params.id}/resources`)
      .then((response) => {
        setList(response.data.reduce((buffer, resource) => buffer.push(
          <ResourceCard key={resource.title} resource={resource} />
        ) && buffer, []));
      });
  }, [params.id]);

  return (
    <div className="flex flex-col gap-4 my-4 overflow-y-auto flex-grow">
      {list}
    </div>
  );
}