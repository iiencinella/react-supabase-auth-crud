import { useState } from "react"
import { clientSupabase } from '../supabase/client';

function TaskForm() {
  const [taskName, setTasName] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const user = await clientSupabase.auth.getUser()
      const result = await clientSupabase.from('Tasks').insert({
        name: taskName,
        userId: user.data.user.id,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="taskName" placeholder="Write a task name" onChange={e => setTasName(e.target.value)} />
      <button>Add</button>
    </form>
  )
}

export default TaskForm