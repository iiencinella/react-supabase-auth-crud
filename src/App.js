import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { clientSupabase } from './supabase/client';
import { TaskProvider } from './context/TaskContext';

import Login from './pages/login';
import Home from './pages/home';
import NotFound from './pages/notFound';

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    clientSupabase.auth.onAuthStateChange((event, session) => {
      if(!session) navigate('/login')
      else navigate('/')
    })
  }, [navigate])

  return (
    <div className="App">
      <TaskProvider>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </TaskProvider>
    </div>
  );
}

export default App;
