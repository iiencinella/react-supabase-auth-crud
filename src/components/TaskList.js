import { useEffect } from 'react';
import { useTask } from '../context/TaskContext';

export default function TaskList() {
  const {tasks, getTasks} = useTask()

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
    {
      tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.name}</h2>
          <p>{JSON.stringify(task.done)}</p>
        </div>
      ))
    }
    </>
  )
}
