import React, { useState } from 'react'
import './EmployeeDashboard.css'

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Sample employee data
  const employeeInfo = {
    name: "Alice Johnson",
    email: "alice@example.com",
    position: "Property Manager",
    buildingId: 1,
    buildingName: "Sunset Tower",
    buildingAddress: "789 Sunset Blvd, Downtown"
  }

  // Sample apartment units data - Will be fetched from backend
  const [apartments, setApartments] = useState([])

  const [showAddUnitForm, setShowAddUnitForm] = useState(false)
  const [editingUnit, setEditingUnit] = useState(null)

  const [newUnit, setNewUnit] = useState({
    unitNumber: '',
    title: '',
    size: '',
    rent: '',
    deposit: '',
    bedrooms: '',
    bathrooms: '',
    availableDate: '',
    petPolicy: 'No pets',
    parking: '',
    features: [],
    description: '',
    images: []
  })

  const featuresList = [
    'Balcony', 'Garden View', 'City View', 'Hardwood Floors', 
    'Carpet', 'Tile Floors', 'Air Conditioning', 'Heating',
    'Dishwasher', 'Microwave', 'Refrigerator', 'Washer/Dryer',
    'Walk-in Closet', 'Storage', 'Fireplace', 'High Ceilings'
  ]

  const handleAddUnit = (e) => {
    e.preventDefault()
    console.log('Adding unit:', newUnit)
    alert('Unit details added successfully!')
    setShowAddUnitForm(false)
    setNewUnit({
      unitNumber: '',
      title: '',
      size: '',
      rent: '',
      deposit: '',
      bedrooms: '',
      bathrooms: '',
      availableDate: '',
      petPolicy: 'No pets',
      parking: '',
      features: [],
      description: '',
      images: []
    })
  }

  const handleEditUnit = (unit) => {
    setEditingUnit(unit)
    setNewUnit({
      unitNumber: unit.unitNumber,
      title: unit.title || `Unit ${unit.unitNumber}`,
      size: unit.size.toString(),
      rent: unit.rent.toString(),
      deposit: unit.deposit?.toString() || '',
      bedrooms: unit.bedrooms || unit.type.split('BR')[0],
      bathrooms: unit.bathrooms || unit.type.split('/')[1]?.split('BA')[0] || '',
      availableDate: unit.availableDate || '',
      petPolicy: unit.petPolicy || 'No pets',
      parking: unit.parking || '',
      features: unit.features || [],
      description: unit.description || '',
      images: unit.images || []
    })
    setShowAddUnitForm(true)
  }

  const handleFeatureChange = (feature) => {
    setNewUnit(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#28a745'
      case 'occupied': return '#007bff'
      case 'maintenance': return '#ffc107'
      default: return '#6c757d'
    }
  }

  const getStats = () => {
    const total = apartments.length
    const available = apartments.filter(apt => apt.status === 'available').length
    const occupied = apartments.filter(apt => apt.status === 'occupied').length
    const avgRent = apartments.reduce((sum, apt) => sum + apt.rent, 0) / total

    return { total, available, occupied, avgRent }
  }

  const stats = getStats()

  return (
    <div className="employee-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <div className="employee-info">
            <h1>Employee Dashboard</h1>
            <div className="info-card">
              <h2>{employeeInfo.name}</h2>
              <p className="position">{employeeInfo.position}</p>
              <p className="building">{employeeInfo.buildingName}</p>
              <p className="address">{employeeInfo.buildingAddress}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'units' ? 'active' : ''}`}
            onClick={() => setActiveTab('units')}
          >
            Apartment Units
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🏠</div>
                <div className="stat-info">
                  <h3>{stats.total}</h3>
                  <p>Total Units</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>{stats.available}</h3>
                  <p>Available</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>{stats.occupied}</h3>
                  <p>Occupied</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>${Math.round(stats.avgRent)}</h3>
                  <p>Avg. Rent</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAddUnitForm(true)}
                >
                  + Add New Unit
                </button>
                <button className="btn btn-secondary">
                  📊 Generate Report
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">➕</div>
                  <div className="activity-content">
                    <p><strong>Unit 102</strong> details updated</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📸</div>
                  <div className="activity-content">
                    <p><strong>Unit 201</strong> photos uploaded</p>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">🏠</div>
                  <div className="activity-content">
                    <p><strong>Unit 101</strong> marked as available</p>
                    <span className="activity-time">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Units Tab */}
        {activeTab === 'units' && (
          <div className="units-section">
            <div className="section-header">
              <h2>Apartment Units</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddUnitForm(true)}
              >
                + Add New Unit
              </button>
            </div>

            <div className="units-grid">
              {apartments.map(unit => (
                <div key={unit.id} className="unit-card">
                  <div className="unit-header">
                    <h3>Unit {unit.unitNumber}</h3>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(unit.status) }}
                    >
                      {unit.status}
                    </span>
                  </div>
                  
                  <div className="unit-image">
                    {unit.images.length > 0 ? (
                      <img src={unit.images[0]} alt={`Unit ${unit.unitNumber}`} />
                    ) : (
                      <div className="no-image">
                        📷 No photos yet
                      </div>
                    )}
                  </div>

                  <div className="unit-details">
                    <div className="detail-row">
                      <span className="label">Title:</span>
                      <span>{unit.title}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Type:</span>
                      <span>{unit.type}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Size:</span>
                      <span>{unit.size} sq ft</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Rent:</span>
                      <span>${unit.rent}/month</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Deposit:</span>
                      <span>${unit.deposit}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Available:</span>
                      <span>{unit.availableDate}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Pets:</span>
                      <span>{unit.petPolicy}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Parking:</span>
                      <span>{unit.parking}</span>
                    </div>
                    {unit.tenant && (
                      <div className="detail-row">
                        <span className="label">Tenant:</span>
                        <span>{unit.tenant}</span>
                      </div>
                    )}
                    {unit.leaseEnd && (
                      <div className="detail-row">
                        <span className="label">Lease End:</span>
                        <span>{unit.leaseEnd}</span>
                      </div>
                    )}
                  </div>

                  <div className="unit-actions">
                    <button 
                      className="btn btn-outline"
                      onClick={() => handleEditUnit(unit)}
                    >
                      Edit Details
                    </button>
                    <button className="btn btn-outline">
                      Upload Photos
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add/Edit Unit Modal */}
        {showAddUnitForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>{editingUnit ? 'Edit Unit Details' : 'Add New Unit'}</h2>
                <button 
                  className="close-btn"
                  onClick={() => {
                    setShowAddUnitForm(false)
                    setEditingUnit(null)
                  }}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleAddUnit} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Unit Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUnit.unitNumber}
                      onChange={(e) => setNewUnit({...newUnit, unitNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Unit Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newUnit.title}
                      onChange={(e) => setNewUnit({...newUnit, title: e.target.value})}
                      placeholder="e.g., Modern Downtown Studio"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Size (sq ft)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newUnit.size}
                      onChange={(e) => setNewUnit({...newUnit, size: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Monthly Rent ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newUnit.rent}
                      onChange={(e) => setNewUnit({...newUnit, rent: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Security Deposit ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newUnit.deposit}
                      onChange={(e) => setNewUnit({...newUnit, deposit: e.target.value})}
                      placeholder="Usually 1-2 months rent"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Available Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newUnit.availableDate}
                      onChange={(e) => setNewUnit({...newUnit, availableDate: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Bedrooms</label>
                    <select
                      className="form-control"
                      value={newUnit.bedrooms}
                      onChange={(e) => setNewUnit({...newUnit, bedrooms: e.target.value})}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Studio">Studio</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Bathrooms</label>
                    <select
                      className="form-control"
                      value={newUnit.bathrooms}
                      onChange={(e) => setNewUnit({...newUnit, bathrooms: e.target.value})}
                      required
                    >
                      <option value="">Select</option>
                      <option value="1">1</option>
                      <option value="1.5">1.5</option>
                      <option value="2">2</option>
                      <option value="2.5">2.5</option>
                      <option value="3">3+</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Pet Policy</label>
                    <select
                      className="form-control"
                      value={newUnit.petPolicy}
                      onChange={(e) => setNewUnit({...newUnit, petPolicy: e.target.value})}
                      required
                    >
                      <option value="No pets">No pets</option>
                      <option value="Cats allowed">Cats allowed</option>
                      <option value="Dogs allowed">Dogs allowed</option>
                      <option value="Cats and dogs allowed">Cats and dogs allowed</option>
                      <option value="All pets allowed">All pets allowed</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Parking</label>
                    <select
                      className="form-control"
                      value={newUnit.parking}
                      onChange={(e) => setNewUnit({...newUnit, parking: e.target.value})}
                      required
                    >
                      <option value="">Select parking option</option>
                      <option value="No parking">No parking</option>
                      <option value="Street parking">Street parking</option>
                      <option value="1 assigned space">1 assigned space</option>
                      <option value="2 assigned spaces">2 assigned spaces</option>
                      <option value="Garage parking">Garage parking</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Monthly Rent ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newUnit.rent}
                    onChange={(e) => setNewUnit({...newUnit, rent: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Unit Features</label>
                  <div className="features-grid">
                    {featuresList.map(feature => (
                      <label key={feature} className="feature-checkbox">
                        <input
                          type="checkbox"
                          checked={newUnit.features.includes(feature)}
                          onChange={() => handleFeatureChange(feature)}
                        />
                        {feature}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={newUnit.description}
                    onChange={(e) => setNewUnit({...newUnit, description: e.target.value})}
                    placeholder="Describe the unit features and amenities..."
                  />
                </div>

                <div className="form-group">
                  <label>Unit Photos</label>
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={(e) => setNewUnit({...newUnit, images: Array.from(e.target.files)})}
                  />
                  <small className="form-text">You can select multiple photos</small>
                </div>

                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setShowAddUnitForm(false)
                      setEditingUnit(null)
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingUnit ? 'Update Unit' : 'Add Unit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeDashboard
