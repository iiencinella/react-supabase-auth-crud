import { useState } from "react"
import { useTask } from '../context/TaskContext';

function TaskForm() {
  const [taskName, setTaskName] = useState("")
  const { getTasks, createTask, adding } = useTask()
  const handleSubmit = async e => {
    e.preventDefault()
    await createTask(taskName)
    setTaskName("")
    getTasks()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="taskName" placeholder="Write a task name" onChange={e => setTaskName(e.target.value)} value={taskName} />
      <button disabled={adding}>
        {adding ? "Adding..." : "Add"}
      </button>
    </form>
  )
}

export default TaskForm