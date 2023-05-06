import './App.css';
import { Route, Routes } from 'react-router-dom';

import Login from './pages/login';
import Home from './pages/home';
import NotFound from './pages/notFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
