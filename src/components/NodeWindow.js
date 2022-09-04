import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

export default function NodeWindow() {
  const [cardType, setCardType] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  // Reset card type upon navigating to a new node
  useEffect(() => { setCardType("resources"); }, [params.id]);

  return (
    // Containing box
    <div style={{
      backgroundColor: "lightgrey",
      borderStyle: "solid",
      position: "absolute",
      margin: "25%",
      height: "50%",
      width: "50%",
      zIndex: 2
    }}>

      {/* Title headline */}
      <h1>{params.id}</h1>

      {/* Exit button */}
      <button
        onClick={() => navigate(`/`)}
        style={{
          position: "absolute",
          top: 0,
          right: 0
        }}>X</button>

      {/* Item type selector */}
      <select id="item-type-select"
        name="item-type"
        value={cardType}
        onChange={(event) => {
          setCardType(event.target.value);
          navigate(`${event.target.value}`);
        }}>
        <option value="resources" defaultChecked>resources</option>
        <option value="inlinks">inlinks</option>
        <option value="outlinks">outlinks</option>
      </select>

      {/* Item list outlet */}
      <Outlet />

    </div >
  );
}