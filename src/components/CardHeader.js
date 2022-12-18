function timeSince(timestamp) {
  let seconds = Math.floor((new Date() - timestamp) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) { return Math.floor(interval) + " years"; }
  interval = seconds / 2592000;
  if (interval > 1) { return Math.floor(interval) + " months"; }
  interval = seconds / 86400;
  if (interval > 1) { return Math.floor(interval) + " days"; }
  interval = seconds / 3600;
  if (interval > 1) { return Math.floor(interval) + " hours"; }
  interval = seconds / 60;
  if (interval > 1) { return Math.floor(interval) + " minutes"; }
  return Math.floor(seconds) + " seconds";
}

export default function CardHeader({ author, timestamp }) {
  const icon = author.charAt(0);

  return (
    <div className="flex flex-row items-center gap-2">
      <h2 className="flex items-center justify-center h-8 w-8 bg-red-500 rounded-full">{icon}</h2>
      <h2 className="font-bold">{author}</h2>
      <h2 className="text-gray-500">{`${timeSince(timestamp)} ago`}</h2>
    </div >
  )
}