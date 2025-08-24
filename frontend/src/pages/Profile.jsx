import React, { useState } from 'react'
import './Profile.css'

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Update user data (in real app, this would make API call)
    const updatedUser = { ...user, ...formData }
    setUser(updatedUser)
    
    // Save to localStorage (in real app, this would be handled by backend)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    setIsEditing(false)
    alert('Profile updated successfully!')
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      bio: user?.bio || ''
    })
    setIsEditing(false)
  }

  const getRoleDisplayName = (role) => {
    switch(role) {
      case 'admin': return 'Administrator'
      case 'owner': return 'Property Owner'
      case 'employee': return 'Property Manager'
      case 'user': return 'User'
      default: return 'User'
    }
  }

  const getRoleDescription = (role) => {
    switch(role) {
      case 'admin': return 'Full system access and management capabilities'
      case 'owner': return 'Manage properties and oversee operations'
      case 'employee': return 'Manage assigned properties and units'
      case 'user': return 'Search and save favorite properties'
      default: return 'Browse and explore properties'
    }
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="profile-error">
            <h2>Access Denied</h2>
            <p>Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-title">
            <h1>My Profile</h1>
            <p>Manage your account information and preferences</p>
          </div>
          <div className="profile-actions">
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                Edit Profile
              </button>
            ) : (
              <div className="edit-actions">
                <button onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
                <button onClick={handleSave} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-main">
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  <span className="avatar-text">
                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="role-badge">
                  <span className={`role-indicator ${user.role}`}>
                    {getRoleDisplayName(user.role)}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSave} className="profile-form">
                <div className="form-section">
                  <h3>Personal Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      ) : (
                        <div className="form-display">{user.name}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      ) : (
                        <div className="form-display">{user.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="+94 XX XXX XXXX"
                        />
                      ) : (
                        <div className="form-display">{user.phone || 'Not provided'}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <div className="form-display role-display">
                        {getRoleDisplayName(user.role)}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <div className="form-display">{user.address || 'Not provided'}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Bio</label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="form-control"
                        rows="3"
                        placeholder="Tell us about yourself..."
                      />
                    ) : (
                      <div className="form-display">{user.bio || 'No bio provided'}</div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="profile-sidebar">
            <div className="info-card">
              <h3>Account Information</h3>
              <div className="info-row">
                <span className="label">Account Type:</span>
                <span className="value">{getRoleDisplayName(user.role)}</span>
              </div>
              <div className="info-row">
                <span className="label">Member Since:</span>
                <span className="value">January 2024</span>
              </div>
              <div className="info-row">
                <span className="label">Status:</span>
                <span className="value status-active">Active</span>
              </div>
              <div className="role-description">
                <p>{getRoleDescription(user.role)}</p>
              </div>
            </div>

            <div className="info-card">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <button className="action-btn">
                  🔒 Change Password
                </button>
                <button className="action-btn">
                  🔔 Notification Settings
                </button>
                <button className="action-btn">
                  📱 Privacy Settings
                </button>
                <button className="action-btn">
                  💾 Download Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
