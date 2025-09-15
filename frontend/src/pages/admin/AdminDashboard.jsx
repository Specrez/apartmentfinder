import React, { useState, useEffect } from 'react'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('owners')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  
  // State for pending registrations - fetched from backend
  const [pendingOwners, setPendingOwners] = useState([])
  const [pendingBuildings, setPendingBuildings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalEmployees: 0,
    totalBuildings: 0,
    pendingOwnerApprovals: 0,
    pendingBuildingApprovals: 0
  })

  // Fetch data from backend on component mount
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      
      console.log('🔄 Fetching dashboard data...')
      
      // Fetch pending owners
      const ownersResponse = await fetch('http://localhost:8080/api/admin/owners/pending')
      if (ownersResponse.ok) {
        const ownersData = await ownersResponse.json()
        console.log('👥 Owners data:', ownersData)
        setPendingOwners(ownersData)
      }

      // Fetch pending buildings
      const buildingsResponse = await fetch('http://localhost:8080/api/admin/buildings/pending')
      console.log('🏢 Buildings response status:', buildingsResponse.status)
      if (buildingsResponse.ok) {
        const buildingsData = await buildingsResponse.json()
        console.log('🏢 Buildings data:', buildingsData)
        console.log('🏢 Number of buildings:', buildingsData.length)
        if (buildingsData.length > 0) {
          console.log('🏢 First building structure:', buildingsData[0])
        }
        setPendingBuildings(buildingsData)
      } else {
        console.error('🏢 Buildings API failed:', buildingsResponse.status)
      }

      // Fetch dashboard stats
      const statsResponse = await fetch('http://localhost:8080/api/admin/dashboard/stats')
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        console.log('📊 Stats data:', statsData)
        setStats(statsData)
      }

    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveOwner = async (ownerId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/owners/${ownerId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        alert('Owner approved successfully!')
        // Remove the approved owner from the pending list
        setPendingOwners(pendingOwners.filter(owner => owner.id !== ownerId))
        // Refresh stats
        fetchDashboardData()
      } else {
        alert('Failed to approve owner')
      }
    } catch (error) {
      console.error('Error approving owner:', error)
      alert('Error approving owner')
    }
  }

  const handleRejectOwner = async (ownerId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/owners/${ownerId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        alert('Owner registration rejected')
        // Remove the rejected owner from the pending list
        setPendingOwners(pendingOwners.filter(owner => owner.id !== ownerId))
        // Refresh stats
        fetchDashboardData()
      } else {
        alert('Failed to reject owner')
      }
    } catch (error) {
      console.error('Error rejecting owner:', error)
      alert('Error rejecting owner')
    }
  }

  const handleApproveBuilding = async (buildingId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/buildings/${buildingId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        alert('Building approved successfully!')
        // Remove the approved building from the pending list
        setPendingBuildings(pendingBuildings.filter(building => building.id !== buildingId))
        // Refresh stats
        fetchDashboardData()
      } else {
        alert('Failed to approve building')
      }
    } catch (error) {
      console.error('Error approving building:', error)
      alert('Error approving building')
    }
  }

  const handleRejectBuilding = async (buildingId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/buildings/${buildingId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        alert('Building registration rejected')
        // Remove the rejected building from the pending list
        setPendingBuildings(pendingBuildings.filter(building => building.id !== buildingId))
        // Refresh stats
        fetchDashboardData()
      } else {
        alert('Failed to reject building')
      }
    } catch (error) {
      console.error('Error rejecting building:', error)
      alert('Error rejecting building')
    }
  }

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo)
    setIsPhotoModalOpen(true)
  }

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false)
    setSelectedPhoto(null)
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Manage owner registrations and building approvals</p>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-info">
              <h3>{stats.totalOwners}</h3>
              <p>Property Owners</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👷</div>
            <div className="stat-info">
              <h3>{stats.totalEmployees}</h3>
              <p>Employees</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏠</div>
            <div className="stat-info">
              <h3>{stats.totalBuildings}</h3>
              <p>Buildings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats.pendingOwnerApprovals}</h3>
              <p>Pending Owner Approvals</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏗️</div>
            <div className="stat-info">
              <h3>{stats.pendingBuildingApprovals}</h3>
              <p>Pending Building Approvals</p>
            </div>
          </div>
        </div>

        {/* Approval Tabs */}
        <div className="approvals-section">
          <div className="section-header">
            <h2>Pending Approvals</h2>
            <div className="tab-navigation">
              <button 
                className={`tab ${activeTab === 'owners' ? 'active' : ''}`}
                onClick={() => setActiveTab('owners')}
              >
                Owner Registrations ({stats.pendingOwnerApprovals || 0})
              </button>
              <button 
                className={`tab ${activeTab === 'buildings' ? 'active' : ''}`}
                onClick={() => setActiveTab('buildings')}
              >
                Building Registrations ({stats.pendingBuildingApprovals || 0})
              </button>
            </div>
          </div>

          {activeTab === 'owners' && (
            <div className="approvals-list">
              {loading ? (
                <div className="loading-message">Loading pending owners...</div>
              ) : error ? (
                <div className="error-message">{error}</div>
              ) : pendingOwners.length === 0 ? (
                <div className="no-data-message">No pending owner registrations</div>
              ) : (
                pendingOwners.map(owner => (
                  <div key={owner.id} className="approval-card">
                    <div className="approval-header">
                      <h3>{owner.name}</h3>
                      <span className="submission-date">Submitted: {new Date(owner.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="approval-details">
                      <div className="detail-row">
                        <span className="label">Email:</span>
                        <span>{owner.email}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Business Name:</span>
                        <span>{owner.businessName || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">License:</span>
                        <span>{owner.businessLicense || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Phone:</span>
                        <span>{owner.phoneNumber || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Address:</span>
                        <span>{owner.address || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="approval-actions">
                      <button 
                        className="btn btn-success"
                        onClick={() => handleApproveOwner(owner.id)}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleRejectOwner(owner.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'buildings' && (
            <div className="approvals-list">
              {loading ? (
                <div className="loading-message">Loading pending buildings...</div>
              ) : error ? (
                <div className="error-message">{error}</div>
              ) : pendingBuildings.length === 0 ? (
                <div className="no-data-message">No pending building registrations</div>
              ) : (
                <>
                  <div style={{padding: '10px', backgroundColor: '#f0f8ff', margin: '10px 0'}}>
                    <strong>DEBUG INFO:</strong><br/>
                    Loading: {loading.toString()}<br/>
                    Error: {error || 'none'}<br/>
                    Buildings count: {pendingBuildings.length}<br/>
                    Active tab: {activeTab}
                  </div>
                  {pendingBuildings.map(building => (
                    <div key={building.id} className="approval-card">
                      <div className="approval-header">
                        <h3>{building.buildingName || building.building_name || 'No Name'}</h3>
                        <span className="submission-date">Submitted: {new Date(building.createdAt || building.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="approval-details">
                        <div className="detail-row">
                          <span className="label">Address:</span>
                          <span>{building.address}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">District:</span>
                          <span>{building.district}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">City:</span>
                          <span>{building.city}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Total Units:</span>
                          <span>{building.totalUnits || building.total_units}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Year Built:</span>
                          <span>{building.yearBuilt || building.year_built || 'N/A'}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Description:</span>
                          <span>{building.description || 'N/A'}</span>
                        </div>
                        {building.amenities && (
                          <div className="detail-row">
                            <span className="label">Amenities:</span>
                            <span>{Array.isArray(building.amenities) ? building.amenities.join(', ') : building.amenities}</span>
                          </div>
                        )}
                        {building.photos && building.photos.length > 0 && (
                          <div className="detail-row">
                            <span className="label">Building Photos:</span>
                            <div className="building-photos">
                              {building.photos.map((photo, index) => (
                                <div key={index} className="photo-container">
                                  <img 
                                    src={photo} 
                                    alt={`${building.buildingName || building.building_name} - Photo ${index + 1}`}
                                    className="building-photo"
                                    onClick={() => handlePhotoClick(photo)}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="approval-actions">
                        <button 
                          className="btn btn-success"
                          onClick={() => handleApproveBuilding(building.id)}
                        >
                          Approve
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleRejectBuilding(building.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Photo Modal */}
        {isPhotoModalOpen && (
          <div className="photo-modal" onClick={closePhotoModal}>
            <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={closePhotoModal}>&times;</span>
              <img src={selectedPhoto} alt="Building" className="modal-photo" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard