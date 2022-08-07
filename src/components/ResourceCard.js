export default function ResourceCard({ resource }) {
  return (
    <div id={"resource-card-" + resource.id}>
      <a href={resource.url}
        target="_blank"
        rel="noopener noreferrer">{resource.title}</a>
    </div>
  );
}