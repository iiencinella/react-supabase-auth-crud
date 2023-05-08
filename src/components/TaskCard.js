import { useTask } from '../context/TaskContext';

export default function TaskCard({ task }) {
  const {deleteTask, getTasks, updateTask} = useTask()

  const handleDelete = async () => {
    await deleteTask(task.id)
    getTasks()
  }

  const handleDone = async () => {
    await updateTask(task.id, {done: true})
    getTasks()
  }

  return (
    <div className='card'>
      <div className='card__content'>
      <h2>{task.name}</h2>
      <p>{JSON.stringify(task.done)}</p>
      <div>
        <button onClick={() => handleDelete()}>Delete</button>
        <button onClick={() => handleDone()}>Done</button>
      </div>
      </div>
    </div>
  )
}
