import { useEffect } from 'react';
import { clientSupabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

import TaskForm from '../components/taskForm';
import { useTask } from '../context/TaskContext';

export default function Home() {
  const navigate = useNavigate()
  const obj = useTask()
  console.log(obj)

  useEffect(() => {
    if(!clientSupabase.auth.getSession()) navigate('/login')
  }, [navigate])

  return (
    <>
      <h2>Home</h2>
      <button onClick={() => clientSupabase.auth.signOut()}>Logout</button>

      <TaskForm />
    </>
  )
}
