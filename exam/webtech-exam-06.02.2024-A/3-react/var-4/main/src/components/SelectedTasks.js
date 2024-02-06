function SelectedTasks (props) {
  const { items, onDeselect } = props
  return (
    <div>
      {
        items.map(e => (
          <div>
            {e.description} {e.priority}
            {/* TODO */}
          </div>
        ))
      }
    </div>
  )
}

export default SelectedTasks