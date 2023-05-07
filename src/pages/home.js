import { useEffect } from 'react';
import { clientSupabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

import TaskForm from '../components/TaskForm';
import { useTask } from '../context/TaskContext';
import TaskList from '../components/TaskList';

export default function Home() {
  const navigate = useNavigate()
  const {tasks} = useTask()

  useEffect(() => {
    if(!clientSupabase.auth.getSession()) navigate('/login')
  }, [navigate])

  return (
    <>
      <h2>Home</h2>
      <button onClick={() => clientSupabase.auth.signOut()}>Logout</button>

      <TaskForm />

      <TaskList />
    </>
  )
}
