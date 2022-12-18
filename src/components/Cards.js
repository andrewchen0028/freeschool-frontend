import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from "uuid";

import CardHeader from "./CardHeader";

/**
 * {Inlink, Outlink, Resource}Card components take the
 * corresponding data objects from the backend, format the
 * data, and return a Card component.
 */

export function InlinkCard({ link }) {
  return (
    <div>
      from <Link className="text-theme-purple-light underline
          focus:text-red-500 visited:text-theme-purple-dark"
        to={`/nodes/${link.source}/resources`}>{link.source}</Link>
    </div>
  )
}

export function OutlinkCard({ link }) {
  return (
    <div>
      from <Link className="text-theme-purple-light underline
    focus:text-red-500 visited:text-theme-purple-dark"
        to={`/nodes/${link.target}/resources`}>{link.target}</Link>
    </div>
  )
}

export function ResourceCard({ resource }) {
  const content = <a children={resource.title}
    className="underline text-blue-600
    focus:text-red-500 visited:text-purple-800"
    href={resource.url} target={"_blank"} rel="noopener noreferrer" />;

  const metadata = {
    author: resource.author,
    timestamp: resource.timestamp,
    score: resource.score,
    comments: resource.comments
  };

  return <Card metadata={metadata} content={content} />;
}

export default function Card({ metadata, content }) {
  const [collapsed, setCollapsed] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    metadata.comments.reduce((buffer, comment) => {
      buffer.push(<Card key={uuidv4()}
        metadata={{
          author: comment.author,
          timestamp: comment.timestamp,
          score: comment.score,
          comments: comment.comments
        }}
        content={comment.content} />);
      return setComments(buffer);
    });
  }, [metadata.comments]);

  return (
    <div className="flex flex-col max-w-5xl">
      {/* Card header */}
      <div className="flex flex-row gap-2">
        {collapsed &&
          <button className="flex items-center justify-center h-8 w-8"
            onClick={() => { setCollapsed(!collapsed); }}>{"\u2922"}
          </button>}
        <CardHeader author={metadata.author} timestamp={metadata.timestamp} />
      </div>

      {/* Collapse ribbon & contents/comments */}
      {!collapsed &&
        <div className="flex flex-row h-fit w-full gap-2">
          <div className="flex justify-center w-8">
            <button className="h-auto w-1 my-1 bg-gray-400"
              onClick={() => { setCollapsed(!collapsed); }} />
          </div>

          <div className="flex flex-col gap-2 h-full grow" >
            {content}
            <div className="flex flex-row gap-2 items-center">
              <button>{"\u25b5"}</button>
              <h1>{metadata.score}</h1>
              <button>{"\u25bf"}</button>
              <button>Reply</button>
            </div>
            {comments}
          </div>

        </div>}

    </div >
  );
}