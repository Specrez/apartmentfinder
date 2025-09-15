import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

const Register = () => {
  const [step, setStep] = useState(1) // 1: Choose role, 2: Fill details
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    // Owner specific fields
    businessName: '',
    businessLicense: '',
    // Employee specific fields (will be filled by owner)
    ownerEmail: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role })
    setStep(2)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      let response
      let endpoint
      let requestData

      if (formData.role === 'user') {
        // User registration - immediate registration
        endpoint = 'http://localhost:8080/api/auth/register/user'
        requestData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
          address: formData.address
        }
      } else if (formData.role === 'owner') {
        // Owner registration - requires admin approval
        endpoint = 'http://localhost:8080/api/auth/register/owner'
        requestData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
          address: formData.address,
          businessName: formData.businessName,
          businessLicense: formData.businessLicense
        }
      }

      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      const data = await response.json()

      if (response.ok) {
        if (formData.role === 'user') {
          alert('User registered successfully! You can now login.')
        } else {
          alert('Owner registration submitted for admin approval.')
        }
        navigate('/login')
      } else {
        setError(data.message || data || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      setError('Network error. Please try again.')
    }
  }

  if (step === 1) {
    return (
      <div className="register-page">
        <div className="container">
          <div className="register-container">
            <div className="register-header">
              <h1>Join Lanka Property</h1>
              <p>Choose your account type to get started</p>
            </div>

            <div className="role-selection">
              <div className="role-cards">
                <div className="role-card" onClick={() => handleRoleSelect('user')}>
                  <div className="role-icon">👤</div>
                  <h3>User</h3>
                  <p>Looking for an apartment to rent</p>
                  <ul>
                    <li>Browse apartment listings</li>
                    <li>View detailed information</li>
                    <li>Contact property managers</li>
                    <li>Save favorite apartments</li>
                  </ul>
                </div>

                <div className="role-card" onClick={() => handleRoleSelect('owner')}>
                  <div className="role-icon">🏢</div>
                  <h3>Property Owner</h3>
                  <p>Own apartment buildings to rent</p>
                  <ul>
                    <li>Register apartment buildings</li>
                    <li>Manage employees</li>
                    <li>Monitor listings</li>
                    <li>Requires admin approval</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="register-footer">
              <p>Already have an account? <Link to="/login" className="link">Sign in here</Link></p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="register-page">
      <div className="container">
        <div className="register-container">
          <div className="register-header">
            <button 
              className="back-btn" 
              onClick={() => setStep(1)}
            >
              ← Back
            </button>
            <h1>Create {formData.role === 'user' ? 'User' : 'Owner'} Account</h1>
            <p>Fill in your details to complete registration</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            {error && <div className="error-message">{error}</div>}
            
            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

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
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Owner Specific Fields */}
            {formData.role === 'owner' && (
              <div className="form-section">
                <h3>Business Information</h3>
                
                <div className="form-group">
                  <label htmlFor="businessName">Business Name</label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    className="form-control"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessLicense">Business License Number</label>
                  <input
                    type="text"
                    id="businessLicense"
                    name="businessLicense"
                    className="form-control"
                    placeholder="Enter your business license number"
                    value={formData.businessLicense}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            )}

            {/* Password Section */}
            <div className="form-section">
              <h3>Security</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-register">
              Create Account
            </button>
          </form>

          <div className="register-footer">
            <p>Already have an account? <Link to="/login" className="link">Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
