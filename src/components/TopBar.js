export default function TopBar() {
  return (
    <div className="flex items-center px-4 h-16 gap-16 bg-theme-white
    border-b-2">
      <h1 className="text-theme-orange text-xl font-extrabold">LearnHub</h1>
      <input type={"text"} placeholder={"search"}
        className="bg-inherit border rounded-sm text-theme-white" />
    </div>
  )
}