import React, { useState } from 'react'
import './AdminDashboard.css'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('owners')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  
  // Sample pending registrations
  const [pendingOwners] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      businessName: "Smith Properties LLC",
      businessLicense: "BL123456",
      phone: "+1-555-0123",
      address: "123 Business Ave, City, State",
      submittedDate: "2025-08-18"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@realty.com",
      businessName: "Johnson Real Estate",
      businessLicense: "BL789012",
      phone: "+1-555-0456",
      address: "456 Commercial St, City, State",
      submittedDate: "2025-08-19"
    }
  ])

  const [pendingBuildings] = useState([
    {
      id: 1,
      buildingName: "Sunset Tower",
      ownerName: "John Smith",
      ownerEmail: "john.smith@example.com",
      address: "789 Sunset Blvd, Downtown",
      totalUnits: 24,
      yearBuilt: 2015,
      amenities: ["Parking", "Gym", "Pool", "24/7 Security"],
      submittedDate: "2025-08-19",
      photos: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 2,
      buildingName: "Green Valley Apartments",
      ownerName: "Sarah Johnson",
      ownerEmail: "sarah.johnson@realty.com",
      address: "321 Green Valley Rd, Suburbs",
      totalUnits: 18,
      yearBuilt: 2018,
      amenities: ["Parking", "Garden", "Playground"],
      submittedDate: "2025-08-20",
      photos: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop"
      ]
    }
  ])

  const [stats] = useState({
    totalUsers: 156,
    totalOwners: 23,
    totalEmployees: 67,
    totalBuildings: 45,
    pendingOwnerApprovals: pendingOwners.length,
    pendingBuildingApprovals: pendingBuildings.length
  })

  const handleApproveOwner = (ownerId) => {
    console.log('Approving owner:', ownerId)
    alert('Owner approved successfully!')
  }

  const handleRejectOwner = (ownerId) => {
    console.log('Rejecting owner:', ownerId)
    alert('Owner registration rejected')
  }

  const handleApproveBuilding = (buildingId) => {
    console.log('Approving building:', buildingId)
    alert('Building approved successfully!')
  }

  const handleRejectBuilding = (buildingId) => {
    console.log('Rejecting building:', buildingId)
    alert('Building registration rejected')
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
        </div>

        {/* Pending Approvals */}
        <div className="pending-section">
          <div className="section-header">
            <h2>Pending Approvals</h2>
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'owners' ? 'active' : ''}`}
                onClick={() => setActiveTab('owners')}
              >
                Owner Registrations ({stats.pendingOwnerApprovals})
              </button>
              <button 
                className={`tab ${activeTab === 'buildings' ? 'active' : ''}`}
                onClick={() => setActiveTab('buildings')}
              >
                Building Registrations ({stats.pendingBuildingApprovals})
              </button>
            </div>
          </div>

          {activeTab === 'owners' && (
            <div className="approvals-list">
              {pendingOwners.map(owner => (
                <div key={owner.id} className="approval-card">
                  <div className="approval-header">
                    <h3>{owner.name}</h3>
                    <span className="submission-date">Submitted: {owner.submittedDate}</span>
                  </div>
                  <div className="approval-details">
                    <div className="detail-row">
                      <span className="label">Email:</span>
                      <span>{owner.email}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Business Name:</span>
                      <span>{owner.businessName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">License:</span>
                      <span>{owner.businessLicense}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Phone:</span>
                      <span>{owner.phone}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Address:</span>
                      <span>{owner.address}</span>
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
              ))}
            </div>
          )}

          {activeTab === 'buildings' && (
            <div className="approvals-list">
              {pendingBuildings.map(building => (
                <div key={building.id} className="approval-card">
                  <div className="approval-header">
                    <h3>{building.buildingName}</h3>
                    <span className="submission-date">Submitted: {building.submittedDate}</span>
                  </div>
                  <div className="approval-details">
                    <div className="detail-row">
                      <span className="label">Owner:</span>
                      <span>{building.ownerName} ({building.ownerEmail})</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Address:</span>
                      <span>{building.address}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Total Units:</span>
                      <span>{building.totalUnits}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Year Built:</span>
                      <span>{building.yearBuilt}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Amenities:</span>
                      <span>{building.amenities.join(', ')}</span>
                    </div>
                    {building.photos && building.photos.length > 0 && (
                      <div className="detail-row">
                        <span className="label">Building Photos:</span>
                        <div className="building-photos">
                          {building.photos.map((photo, index) => (
                            <div key={index} className="photo-container">
                              <img 
                                src={photo} 
                                alt={`${building.buildingName} - Photo ${index + 1}`}
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
            </div>
          )}
        </div>
      </div>

      {/* Photo Modal */}
      {isPhotoModalOpen && (
        <div className="photo-modal" onClick={closePhotoModal}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closePhotoModal}>×</button>
            <img src={selectedPhoto} alt="Building Photo" className="modal-photo" />
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
