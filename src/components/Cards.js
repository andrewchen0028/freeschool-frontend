import { useNavigate } from "react-router-dom"

export function InlinkCard({ link }) {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => {
        navigate(`/nodes/${link.source}/resources`);
      }}>from {link.source}</button>
    </div>
  )
}

export function OutlinkCard({ link }) {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => {
        navigate(`/nodes/${link.target}/resources`);
      }}>to {link.target}</button>
    </div>
  )
}

export function ResourceCard({ resource }) {
  return (
    <div>
      <a href={resource.url}
        target="_blank"
        rel="noopener noreferrer">{resource.title}</a>
    </div>
  )
}