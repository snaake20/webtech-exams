import { useCallback, useState } from 'react'

function Task ({item}) {

  const [status, setStatus] = useState("not done")

  const toggleStatus = useCallback(() => {
    if (status === 'not done') {
      return setStatus('done')
    }
    if (status === 'done') {
      return setStatus('not done')
    }
  }, [status, setStatus])

  return (
    <div style={{backgroundColor: item.priority === 'low' ? 'lightgreen' : ''}}>
      {item.description} {status} {item.priority}
      <button onClick={toggleStatus}>toggle</button>
    </div>
  )
}

export default Task
