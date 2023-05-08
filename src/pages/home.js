import { useEffect, useState } from 'react';
import { clientSupabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  const navigate = useNavigate()
  const [showTaskDone, setShowTaskDone] = useState(false)

  useEffect(() => {
    if (!clientSupabase.auth.getSession()) navigate('/login')
  }, [navigate])

  return (
    <>
      <h2>Home</h2>
      <button onClick={() => clientSupabase.auth.signOut()}>Logout</button>

      <TaskForm />

      <header>
        <span>Task Pending</span>
        <button onClick={() => setShowTaskDone(!showTaskDone)}>Change Show Task done</button>
      </header>

      <TaskList done={showTaskDone} />
    </>
  )
}
