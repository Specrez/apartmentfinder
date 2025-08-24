import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDemoLogin = (email, password) => {
    setFormData({ email, password })
    
    // Auto-submit after setting the data
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} })
    }, 100)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Demo login logic - replace with actual authentication
    if (formData.email && formData.password) {
      // Simulate different user roles based on email
      let userRole = 'user'
      let userName = 'User'

      if (formData.email.includes('admin')) {
        userRole = 'admin'
        userName = 'Admin'
      } else if (formData.email.includes('owner')) {
        userRole = 'owner'
        userName = 'Owner'
      } else if (formData.email.includes('employee')) {
        userRole = 'employee'
        userName = 'Employee'
      }

      const user = {
        id: 1,
        name: userName,
        email: formData.email,
        role: userRole
      }

      setUser(user)
      
      // Navigate to appropriate dashboard
      switch (userRole) {
        case 'admin':
          navigate('/admin')
          break
        case 'owner':
          navigate('/owner')
          break
        case 'employee':
          navigate('/employee')
          break
        default:
          navigate('/user')
      }
    } else {
      setError('Please fill in all fields')
    }
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-login">
              Sign In
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/register" className="link">Register here</Link></p>
          </div>

          <div className="demo-accounts">
            <h3>Demo Accounts</h3>
            <div className="demo-list">
              <div 
                className="demo-item"
                onClick={() => handleDemoLogin('admin@example.com', 'password')}
              >
                <strong>Admin:</strong> admin@example.com / password
              </div>
              <div 
                className="demo-item"
                onClick={() => handleDemoLogin('owner@example.com', 'password')}
              >
                <strong>Owner:</strong> owner@example.com / password
              </div>
              <div 
                className="demo-item"
                onClick={() => handleDemoLogin('employee@example.com', 'password')}
              >
                <strong>Employee:</strong> employee@example.com / password
              </div>
              <div 
                className="demo-item"
                onClick={() => handleDemoLogin('user@example.com', 'password')}
              >
                <strong>User:</strong> user@example.com / password
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
