import React, { useState } from 'react'
import './OwnerDashboard.css'

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Sample data
  const [buildings] = useState([
    {
      id: 1,
      name: "Sunset Tower",
      address: "789 Sunset Blvd, Downtown",
      totalUnits: 24,
      occupiedUnits: 19,
      employees: 3,
      status: "approved",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Ocean View Apartments",
      address: "456 Ocean Drive, Beachside",
      totalUnits: 18,
      occupiedUnits: 15,
      employees: 2,
      status: "pending",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop"
    }
  ])

  const [employees] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      buildingId: 1,
      buildingName: "Sunset Tower",
      position: "Property Manager",
      joinDate: "2025-01-15"
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob@example.com",
      buildingId: 1,
      buildingName: "Sunset Tower",
      position: "Maintenance Staff",
      joinDate: "2025-02-01"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      buildingId: 2,
      buildingName: "Ocean View Apartments",
      position: "Leasing Agent",
      joinDate: "2025-03-10"
    }
  ])

  const [showAddBuildingForm, setShowAddBuildingForm] = useState(false)
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false)

  const [newBuilding, setNewBuilding] = useState({
    name: '',
    address: '',
    totalUnits: '',
    yearBuilt: '',
    amenities: [],
    description: '',
    image: null
  })

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    buildingId: '',
    position: ''
  })

  const amenitiesList = [
    'Parking', 'Gym', 'Pool', 'Garden', 'Playground', 
    '24/7 Security', 'Elevator', 'Laundry', 'WiFi', 'Air Conditioning'
  ]

  const handleAddBuilding = (e) => {
    e.preventDefault()
    console.log('Adding building:', newBuilding)
    alert('Building registration submitted for admin approval!')
    setShowAddBuildingForm(false)
    setNewBuilding({
      name: '',
      address: '',
      totalUnits: '',
      yearBuilt: '',
      amenities: [],
      description: '',
      image: null
    })
  }

  const handleAddEmployee = (e) => {
    e.preventDefault()
    console.log('Adding employee:', newEmployee)
    alert('Employee registration submitted! Login details sent to employee email.')
    setShowAddEmployeeForm(false)
    setNewEmployee({
      name: '',
      email: '',
      buildingId: '',
      position: ''
    })
  }

  const handleAmenityChange = (amenity) => {
    setNewBuilding(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const getEmployeesByBuilding = (buildingId) => {
    return employees.filter(emp => emp.buildingId === buildingId)
  }

  return (
    <div className="owner-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Owner Dashboard</h1>
          <p>Manage your properties and employees</p>
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
            className={`tab ${activeTab === 'buildings' ? 'active' : ''}`}
            onClick={() => setActiveTab('buildings')}
          >
            My Buildings
          </button>
          <button 
            className={`tab ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            Employees
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🏢</div>
                <div className="stat-info">
                  <h3>{buildings.length}</h3>
                  <p>Total Buildings</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏠</div>
                <div className="stat-info">
                  <h3>{buildings.reduce((sum, b) => sum + b.totalUnits, 0)}</h3>
                  <p>Total Units</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>{employees.length}</h3>
                  <p>Employees</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>{Math.round((buildings.reduce((sum, b) => sum + b.occupiedUnits, 0) / buildings.reduce((sum, b) => sum + b.totalUnits, 0)) * 100)}%</h3>
                  <p>Occupancy Rate</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAddBuildingForm(true)}
                >
                  + Add New Building
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowAddEmployeeForm(true)}
                >
                  + Add Employee
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Buildings Tab */}
        {activeTab === 'buildings' && (
          <div className="buildings-section">
            <div className="section-header">
              <h2>My Buildings</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddBuildingForm(true)}
              >
                + Add New Building
              </button>
            </div>

            <div className="buildings-grid">
              {buildings.map(building => (
                <div key={building.id} className="building-card">
                  <img src={building.image} alt={building.name} className="building-image" />
                  <div className="building-info">
                    <div className="building-header">
                      <h3>{building.name}</h3>
                      <span className={`status ${building.status}`}>
                        {building.status === 'approved' ? '✅ Approved' : '⏳ Pending'}
                      </span>
                    </div>
                    <p className="building-address">📍 {building.address}</p>
                    <div className="building-stats">
                      <div className="stat">
                        <strong>{building.occupiedUnits}</strong>/{building.totalUnits} occupied
                      </div>
                      <div className="stat">
                        <strong>{building.employees}</strong> employees
                      </div>
                    </div>
                    <div className="building-actions">
                      <button className="btn btn-outline">View Details</button>
                      <button className="btn btn-outline">Manage Units</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === 'employees' && (
          <div className="employees-section">
            <div className="section-header">
              <h2>Employees</h2>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddEmployeeForm(true)}
              >
                + Add Employee
              </button>
            </div>

            <div className="employees-list">
              {buildings.map(building => (
                <div key={building.id} className="building-employees">
                  <h3>{building.name}</h3>
                  <div className="employees-grid">
                    {getEmployeesByBuilding(building.id).map(employee => (
                      <div key={employee.id} className="employee-card">
                        <div className="employee-info">
                          <h4>{employee.name}</h4>
                          <p className="employee-email">{employee.email}</p>
                          <p className="employee-position">{employee.position}</p>
                          <p className="employee-join-date">Joined: {employee.joinDate}</p>
                        </div>
                        <div className="employee-actions">
                          <button className="btn btn-outline btn-small">Edit</button>
                          <button className="btn btn-danger btn-small">Remove</button>
                        </div>
                      </div>
                    ))}
                    {getEmployeesByBuilding(building.id).length === 0 && (
                      <p className="no-employees">No employees assigned to this building</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Building Modal */}
        {showAddBuildingForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Add New Building</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowAddBuildingForm(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleAddBuilding} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Building Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newBuilding.name}
                      onChange={(e) => setNewBuilding({...newBuilding, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newBuilding.address}
                      onChange={(e) => setNewBuilding({...newBuilding, address: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Total Units</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newBuilding.totalUnits}
                      onChange={(e) => setNewBuilding({...newBuilding, totalUnits: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Year Built</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newBuilding.yearBuilt}
                      onChange={(e) => setNewBuilding({...newBuilding, yearBuilt: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Building Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setNewBuilding({...newBuilding, image: e.target.files[0]})}
                  />
                </div>

                <div className="form-group">
                  <label>Amenities</label>
                  <div className="amenities-grid">
                    {amenitiesList.map(amenity => (
                      <label key={amenity} className="amenity-checkbox">
                        <input
                          type="checkbox"
                          checked={newBuilding.amenities.includes(amenity)}
                          onChange={() => handleAmenityChange(amenity)}
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={newBuilding.description}
                    onChange={(e) => setNewBuilding({...newBuilding, description: e.target.value})}
                    placeholder="Describe your building..."
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddBuildingForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit for Approval
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Employee Modal */}
        {showAddEmployeeForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Add New Employee</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowAddEmployeeForm(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleAddEmployee} className="modal-form">
                <div className="form-group">
                  <label>Employee Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Assign to Building</label>
                  <select
                    className="form-control"
                    value={newEmployee.buildingId}
                    onChange={(e) => setNewEmployee({...newEmployee, buildingId: e.target.value})}
                    required
                  >
                    <option value="">Select a building</option>
                    {buildings.filter(b => b.status === 'approved').map(building => (
                      <option key={building.id} value={building.id}>
                        {building.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Position</label>
                  <select
                    className="form-control"
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    required
                  >
                    <option value="">Select position</option>
                    <option value="Property Manager">Property Manager</option>
                    <option value="Leasing Agent">Leasing Agent</option>
                    <option value="Maintenance Staff">Maintenance Staff</option>
                    <option value="Security">Security</option>
                    <option value="Administrative Assistant">Administrative Assistant</option>
                  </select>
                </div>

                <div className="info-box">
                  <p><strong>Note:</strong> Login credentials will be automatically generated and sent to the employee's email address.</p>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowAddEmployeeForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Employee
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

export default OwnerDashboard
