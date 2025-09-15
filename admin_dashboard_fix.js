// AdminDashboard.jsx - Key sections that need to be added to fix owner approvals

// 1. Add useEffect to fetch data when component mounts
useEffect(() => {
  fetchDashboardData()
}, [])

// 2. Add function to fetch data from backend
const fetchDashboardData = async () => {
  try {
    setLoading(true)
    setError('')
    
    // Fetch pending owners
    const ownersResponse = await fetch('http://localhost:8080/api/admin/owners/pending')
    if (ownersResponse.ok) {
      const ownersData = await ownersResponse.json()
      setPendingOwners(ownersData)
    }

    // Fetch pending buildings
    const buildingsResponse = await fetch('http://localhost:8080/api/admin/buildings/pending')
    if (buildingsResponse.ok) {
      const buildingsData = await buildingsResponse.json()
      setPendingBuildings(buildingsData)
    }

    // Fetch dashboard stats
    const statsResponse = await fetch('http://localhost:8080/api/admin/dashboard/stats')
    if (statsResponse.ok) {
      const statsData = await statsResponse.json()
      setStats(statsData)
    }

  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    setError('Failed to load dashboard data')
  } finally {
    setLoading(false)
  }
}

// 3. Update approve/reject functions to make API calls
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
      // Remove from pending list and refresh data
      setPendingOwners(pendingOwners.filter(owner => owner.id !== ownerId))
      fetchDashboardData()
    } else {
      alert('Failed to approve owner')
    }
  } catch (error) {
    console.error('Error approving owner:', error)
    alert('Error approving owner')
  }
}

// 4. In the JSX, replace the owners list with:
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