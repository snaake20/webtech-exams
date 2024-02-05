import { useState, useEffect, useMemo } from 'react'

function EmployeeForm({ onAdd }) {
  const [name, setName] = useState("")
  const [job, setJob] = useState("")
  const [salary, setSalary] = useState("")

  const isValid = useMemo(() => {
    if (!name && !job && !salary) return false;
    return parseInt(salary) > 1000;
  }, [job, name, salary])

  return (
    <div>
      <input type='text' placeholder='name' onChange={(evt) => setName(evt.target.value)} />
      <input type='text' placeholder='job' onChange={(evt) => setJob(evt.target.value)} />
      <input type='text' placeholder='salary' onChange={(evt) => setSalary(evt.target.value)} />
      <input type='button' value='add' onClick={() => onAdd({name, job, salary})} disabled={!isValid} />
    </div>
  )
}

export default EmployeeForm