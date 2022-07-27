function Resource({ resource }) {
  return (
    <div>
      <a href={resource.url}
        target='_blank'
        rel='noopener noreferrer'>{resource.title}</a>
    </div>
  )
}

export default Resource