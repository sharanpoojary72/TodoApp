import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Todos from './components/Todos'
import Register from './components/Register'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES (Requires Login) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/todos" element={<Todos />} />
          {/* You can add more private pages here */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
