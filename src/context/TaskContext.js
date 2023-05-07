import { createContext, useContext, useState } from 'react';
import { clientSupabase } from '../supabase/client';

export const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) throw new Error("No se encuentra useTask dentro de un contexto")
  return context
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const getTasks = async (done = false) => {
    const user = (await clientSupabase.auth.getUser()).data.user
    const {error, data} = await clientSupabase.from('Tasks').select().eq('userId', user.id).eq('done', done).order('id', {ascending: true})
    if(error) throw error

    setTasks(data)
  }
  return <TaskContext.Provider value={{tasks, getTasks}}>
    {children}
  </TaskContext.Provider>
}