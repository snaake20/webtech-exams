function SelectedTasks (props) {
  const { items, onDeselect } = props
  return (
    <div>
      {
        items.map(e => (
          <div key={e.id}>
            {e.description} {e.priority}
            <button onClick={() => onDeselect(e)}>deselect</button>
          </div>
        ))
      }
    </div>
  )
}

export default SelectedTasks