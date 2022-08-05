export default function ResourceCard(props) {
  return (
    <div id={"resource-card-" + props.resource.id}>
      <a href={props.resource.url}
        target="_blank"
        rel="noopener noreferrer">{props.resource.title}</a>
    </div>
  );
}