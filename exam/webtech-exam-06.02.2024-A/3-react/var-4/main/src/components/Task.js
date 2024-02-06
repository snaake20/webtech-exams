import { useState } from 'react'
import store from '../stores/TaskStore'

function Task (props) {
  let { item, onSelect } = props
  return (
    <div>
      {
        <>
          {item.description} {item.priority}
          <button onClick={() => onSelect(item)}>select</button>
        </>
      }
    </div>
  )

}

export default Task
