import { useTask } from '../context/TaskContext';

export default function TaskCard({ task }) {
  const {deleteTask, getTasks} = useTask()

  const handleDelete = () => {
    deleteTask(task.id)
  }

  const handleDone = () => {
    alert('Cambiando estado de tarea')
  }

  return (
    <div>
      <h2>{task.name}</h2>
      <p>{JSON.stringify(task.done)}</p>
      <div>
        <button onClick={() => handleDelete()}>Delete</button>
        <button onClick={() => handleDone()}>Done</button>
      </div>
    </div>
  )
}
