import { useCallback, useState } from 'react'
import store from '../stores/TaskStore'

function Task (props) {
  let { item } = props
  const [ isEditable, setIsEditable ] = useState(false)
  const [ description, setDescription ] = useState(item.description)
  const [ priority, setPriority ] = useState(item.priority)

  const toggleEdit = useCallback(() => {
    setIsEditable(prev => !prev);
  }, [setIsEditable])

  const saveItem = useCallback(() => {
    store.saveItem(item.id, {
      id: item.id,
      description,
      priority
    })
    setIsEditable(false)
  })

  return (
    <div>
      {
        isEditable ? (
          <div>
           <button onClick={toggleEdit}>cancel</button>
           <input onChange={(e) => setDescription(e.target.value)} value={description} />
           <input onChange={(e) => setPriority(e.target.value)} value={priority} />
           <input onClick={saveItem} type='select' value='save'/>
          </div>
        ) : (
          <div>
           <button onClick={toggleEdit}>select</button>
           <p>{description}</p>
           <p>{priority}</p>
          </div>
        )
      }
    </div>
  )

}

export default Task
