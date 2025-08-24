import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ user, setUser }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear user state
    setUser(null)
    
    // Clear any stored user data
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    
    // Navigate to home page
    navigate('/')
    
    // Optional: Show logout confirmation (less intrusive)
    console.log('User logged out successfully')
  }

  const renderUserNav = () => {
    if (!user) {
      return (
        <div className="navbar-menu">
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/login" className={`navbar-link ${location.pathname === '/login' ? 'active' : ''}`}>
            Login
          </Link>
          <Link to="/register" className={`navbar-link ${location.pathname === '/register' ? 'active' : ''}`}>
            Register
          </Link>
        </div>
      )
    }

    // Admin Navigation
    if (user.role === 'admin') {
      return (
        <div className="navbar-menu">
          <Link to="/admin" className={`navbar-link ${location.pathname === '/admin' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
            Profile
          </Link>
          <span className="user-info">Admin: {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )
    }

    // Owner Navigation
    if (user.role === 'owner') {
      return (
        <div className="navbar-menu">
          <Link to="/owner" className={`navbar-link ${location.pathname === '/owner' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
            Browse
          </Link>
          <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
            Profile
          </Link>
          <span className="user-info">Owner: {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )
    }

    // Employee Navigation
    if (user.role === 'employee') {
      return (
        <div className="navbar-menu">
          <Link to="/employee" className={`navbar-link ${location.pathname === '/employee' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
            Browse
          </Link>
          <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
            Profile
          </Link>
          <span className="user-info">Employee: {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )
    }

    // Regular User Navigation
    return (
      <div className="navbar-menu">
        <Link to="/user" className={`navbar-link ${location.pathname === '/user' ? 'active' : ''}`}>
          Browse
        </Link>
        <Link to="/saved" className={`navbar-link ${location.pathname === '/saved' ? 'active' : ''}`}>
          Saved
        </Link>
        <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
          Profile
        </Link>
        <span className="user-info">User: {user.name}</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    )
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            🏠 Lanka Property
          </Link>
          {renderUserNav()}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
