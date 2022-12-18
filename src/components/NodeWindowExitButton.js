import { useNavigate } from "react-router-dom"

export default function NodeWindowExitButton() {
  const navigate = useNavigate();

  return (
    <div id="node-window-exit-button"
      className="flex items-start justify-end">
      <button onClick={() => navigate(`/`)}>X</button>
    </div>
  )
}