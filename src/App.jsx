import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Daily from './pages/Daily'
import Roadmap from './pages/Roadmap'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <h1>Level Up Lolly</h1>
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/daily" className={({ isActive }) => isActive ? 'active' : ''}>
                Daily
              </NavLink>
            </li>
            <li>
              <NavLink to="/roadmap" className={({ isActive }) => isActive ? 'active' : ''}>
              Dream Goals
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                Login
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App