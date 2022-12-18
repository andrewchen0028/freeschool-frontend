import { useNavigate } from "react-router-dom";

export default function NodeItemSelector({ cardType, setCardType }) {
  const navigate = useNavigate();

  const onClick = (cardType) => {
    setCardType(cardType);
    navigate(cardType);
  };

  return (
    <div id="node-item-selector" className="flex flex-row gap-4">
      <h3 className="m-0">View:</h3>

      <button className={`border border-solid border-theme-gray-dark
        bg-theme-blue-light text-theme-white px-1
        ${cardType === "resources" ? "font-extrabold" : "font-normal"}`}
        onClick={() => onClick("resources")}>RESOURCES</button>

      <button className={`border border-solid border-theme-gray-dark
        bg-theme-blue-light text-theme-white px-1
        ${cardType === "inlinks" ? "font-extrabold" : "font-normal"}`}
        onClick={() => onClick("inlinks")}>INLINKS</button>

      <button className={`border border-solid border-theme-gray-dark
        bg-theme-blue-light text-theme-white px-1
        ${cardType === "outlinks" ? "font-extrabold" : "font-normal"}`}
        onClick={() => onClick("outlinks")}>OUTLINKS</button>
    </div >
  )
}