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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      // Make API call to backend for authentication
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      if (response.ok) {
        const data = await response.json()
        
        // Store token and user data
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Set user in parent component
        setUser(data.user)
        
        // Navigate to appropriate dashboard based on role
        switch (data.user.role) {
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
        const errorData = await response.text()
        setError(errorData || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please try again.')
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
            <h3>Test Accounts</h3>
            <div className="demo-list">
              <div 
                className="demo-item"
                onClick={() => handleDemoLogin('oshadha.dw@gmail.com', 'password123')}
              >
                <strong>User:</strong> oshadha.dw@gmail.com / password123
              </div>
              <div 
                className="demo-item"
                onClick={() => handleDemoLogin('nalan@gmail.com', 'password123')}
              >
                <strong>Owner (Approved):</strong> nalan@gmail.com / password123
              </div>
              <div 
                className="demo-item"
                onClick={() => handleDemoLogin('kavishka@gmail.com', 'password123')}
              >
                <strong>Owner (Pending):</strong> kavishka@gmail.com / password123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
