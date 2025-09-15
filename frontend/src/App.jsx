import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/AdminDashboard'
import OwnerDashboard from './pages/owner/OwnerDashboard'
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import UserDashboard from './pages/user/UserDashboard'
import ApartmentDetails from './pages/ApartmentDetails'
import SavedAds from './pages/user/SavedAds'
import Profile from './pages/Profile'
import SimpleAdminTest from './SimpleAdminTest'
import './App.css'

function App() {
  const [user, setUser] = useState(null) // Will store user info and role

  // Load user from localStorage on app start (optional persistence)
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        // If there's an error parsing, clear the storage
        localStorage.removeItem('user')
      }
    }
  }, [])

  // Save user to localStorage when user state changes (optional persistence)
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  // Protected Route Component
  const ProtectedRoute = ({ children, requiredRole, user }) => {
    if (!user) {
      return <Login setUser={setUser} />
    }
    
    if (requiredRole && user.role !== requiredRole) {
      return <Home user={user} />
    }
    
    return children
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/apartment/:id" element={<ApartmentDetails user={user} />} />
            
            {/* Test Route */}
            <Route path="/test" element={<SimpleAdminTest />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin" user={user}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Owner Routes */}
            <Route path="/owner" element={
              <ProtectedRoute requiredRole="owner" user={user}>
                <OwnerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Employee Routes */}
            <Route path="/employee" element={
              <ProtectedRoute requiredRole="employee" user={user}>
                <EmployeeDashboard />
              </ProtectedRoute>
            } />
            
            {/* User Routes */}
            <Route path="/user" element={
              <ProtectedRoute requiredRole="user" user={user}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/saved" element={
              <ProtectedRoute requiredRole="user" user={user}>
                <SavedAds />
              </ProtectedRoute>
            } />
            
            {/* Profile Route - Available to all logged-in users */}
            <Route path="/profile" element={
              <ProtectedRoute user={user}>
                <Profile user={user} setUser={setUser} />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
