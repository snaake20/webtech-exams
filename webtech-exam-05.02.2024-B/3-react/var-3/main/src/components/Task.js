function Task (props) {
  let { item, onSelect } = props

  return (
    <div>
      {item.description} {item.priority}
      <button type="button" onClick={() => onSelect(item)}>select</button>
    </div>
  )

}

export default Task
