import { useState, useEffect } from 'react'
import store from '../stores/TaskStore'
import Task from './Task'
import TaskForm from './TaskForm'

function TaskList () {
	const [tasks, setTasks] = useState([])
	const [selected, setSelected] = useState(null)

	useEffect(() => {
		setTasks(store.getItems())
		store.emitter.addEventListener('UPDATE', () => {
			setTasks([...store.getItems()])
		})
	}, [])

	return (
		<div>	 
			<div>
				{
					tasks.map((e) => 
						<Task item={e} key={e.id} onSelect={(item) => setSelected(item)} />
					)
				}
				{selected ? <TaskForm item={selected}/> : null}
			</div>
		</div>
	)
}

export default TaskList
