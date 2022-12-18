import { Outlet } from "react-router-dom";

export default function NodeItemList() {
  return (
    <div id="node-item-list"
      className="flex self-stretch grow overflow-auto mb-0">
      <Outlet />
    </div>
  )
}