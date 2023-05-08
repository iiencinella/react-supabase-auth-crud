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
  const [adding, setAdding] = useState(false)

  const getTasks = async (done = false) => {
    const { data: { user } } = await clientSupabase.auth.getUser()
    const { error, data } = await clientSupabase.from('Tasks').select().eq('userId', user.id).eq('done', done).order('id', { ascending: true })
    if (error) throw error

    setTasks(data)
  }

  const createTask = async (taskName) => {
    try {
      setAdding(true)
      const { data: { user } } = await clientSupabase.auth.getUser()
      const { data, error } = await clientSupabase.from('Tasks').insert({
        name: taskName,
        userId: user.id,
      })
  
      if (error) throw error
    } catch (error) {
      console.error(error)
    } finally {
      setAdding(false)
    }
  }

  return <TaskContext.Provider value={{ tasks, getTasks, createTask, adding }}>
    {children}
  </TaskContext.Provider>
}