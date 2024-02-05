import { useState, useEffect, useCallback } from 'react'
import store from '../stores/TaskStore'

function TaskForm (props) {
  const { item } = props
  const [ description, setDescription ] = useState(item.description)
  const [ priority, setPriority ] = useState(item.priority)

  const save = useCallback(() => {
    store.saveItem(item.id, {
        id: item.id,
        description,
        priority
    })
  }, [description, item.id, priority])

  return (
    <div>
      <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type='text' value={priority} onChange={(e) => setPriority(e.target.value)} />
      <input type="select" value="save" onClick={save} />
    </div>
  );
}

export default TaskForm