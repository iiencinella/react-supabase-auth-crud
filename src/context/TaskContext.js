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
  const [loading, setLoading] = useState(true)

  const getTasks = async (done = false) => {
    setLoading(true)
    const { data: { user } } = await clientSupabase.auth.getUser()
    const { error, data } = await clientSupabase.from('Tasks').select().eq('userId', user.id).eq('done', done).order('id', { ascending: true })
    if (error) throw error

    setTasks(data)
    setLoading(false)
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

  const deleteTask = async (id) => {
    const { data: { user } } = await clientSupabase.auth.getUser()
    const { data, error } = await clientSupabase.from('Tasks').delete().eq('userId', user.id).eq('id', id)

    if (error) throw error
  }

  return <TaskContext.Provider value={{ tasks, getTasks, createTask, adding, loading, deleteTask }}>
    {children}
  </TaskContext.Provider>
}