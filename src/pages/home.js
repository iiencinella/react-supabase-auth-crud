import { useEffect } from 'react';
import { clientSupabase } from '../supabase/client';
import { useNavigate } from 'react-router-dom';

import TaskForm from '../components/taskForm';

export default function Home() {
  const navigate = useNavigate()

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
