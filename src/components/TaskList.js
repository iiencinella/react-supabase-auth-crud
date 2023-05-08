import { useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from './TaskCard';

export default function TaskList({done = false}) {
  const { tasks, getTasks, loading } = useTask()

  useEffect(() => {
    getTasks(done)
  }, [done])

  function RenderTasks() {
    if (loading) {
      return <p>Loading ...</p>
    }
    else if (tasks.length === 0) {
      return <p>No hay tareas para cargar</p>
    }
    else {
      return (
        <>
          {
            tasks.map((task) => (
              <div key={task.id}>
                <TaskCard task={task} />
              </div>
            ))
          }
        </>
      )
    }
  }

  return (
    <div>
      {RenderTasks()}
    </div>
  )
}
