import { createContext, useContext } from 'react';

export const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  if(!context) throw new Error("No se encuentra useTask dentro de un contexto")
  return context
}

export const TaskProvider = ({children}) => {
  return <TaskContext.Provider value={{name: "Hola mundo!"}}>
    {children}
  </TaskContext.Provider>
}