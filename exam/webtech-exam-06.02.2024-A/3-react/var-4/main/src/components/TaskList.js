import { useState, useEffect, useCallback } from 'react'
import store from '../stores/TaskStore'
import Task from './Task'
import SelectedTasks from './SelectedTasks'

function TaskList () {
	const [tasks, setTasks] = useState([])
	const [selectedTasks, setSelectedTasks] = useState([])

	useEffect(() => {
		setTasks(store.getItems())
		store.emitter.addEventListener('UPDATE', () => {
			setTasks([...store.getItems()])
		})
	}, [])

	const select = useCallback((item) => {
		if (selectedTasks.includes(item)) return
		setSelectedTasks(prev => [...prev, item])
	}, [selectedTasks])

	const deselect = (item) => {
		setSelectedTasks(selectedTasks.filter(e => e !== item))
	}

	return (
		<div>	 
			<div>
				{
					tasks.map((e) => 
						<Task item={e} key={e.id} onSelect={select} />
					)
				}
				{selectedTasks.length > 0 ? <SelectedTasks items={selectedTasks} onDeselect={deselect} /> : null }
			</div>
		</div>
	)
}

export default TaskList
