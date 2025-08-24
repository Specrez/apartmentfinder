import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'

const Home = ({ user }) => {
  const navigate = useNavigate()
  
  // Sample apartment data for both guests and users
  const [apartments] = useState([
    {
      id: 1,
      name: "Sunset Residences",
      location: "Downtown",
      totalUnits: 24,
      availableUnits: 5,
      startingPrice: 1200,
      rent: 1200,
      bedrooms: 2,
      bathrooms: 2,
      petFriendly: true,
      parking: true,
      furnished: false,
      amenities: ["Gym", "Pool", "Security"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      description: "Modern apartments with city views",
      saved: false
    },
    {
      id: 2,
      name: "Green Valley Apartments", 
      location: "Suburbs",
      totalUnits: 18,
      availableUnits: 3,
      startingPrice: 900,
      rent: 900,
      bedrooms: 1,
      bathrooms: 1,
      petFriendly: false,
      parking: true,
      furnished: true,
      amenities: ["Garden", "Playground"],
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      description: "Peaceful living surrounded by nature",
      saved: false
    },
    {
      id: 3,
      name: "City Center Plaza",
      location: "Business District", 
      totalUnits: 36,
      availableUnits: 8,
      startingPrice: 1500,
      rent: 1500,
      bedrooms: 3,
      bathrooms: 2,
      petFriendly: true,
      parking: true,
      furnished: false,
      amenities: ["Gym", "Pool", "Security", "Concierge"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
      description: "Luxury apartments in prime location",
      saved: true
    }
  ])

  // Filter states for logged-in users
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: '',
    minRent: '',
    maxRent: '',
    bedrooms: '',
    petFriendly: false,
    parking: false,
    furnished: false
  })

  // Filter apartments based on current filters
  const filteredApartments = apartments.filter(apt => {
    if (filters.location && !apt.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (filters.minRent && apt.rent < parseInt(filters.minRent)) return false
    if (filters.maxRent && apt.rent > parseInt(filters.maxRent)) return false
    if (filters.bedrooms && apt.bedrooms < parseInt(filters.bedrooms)) return false
    if (filters.petFriendly && !apt.petFriendly) return false
    if (filters.parking && !apt.parking) return false
    if (filters.furnished && !apt.furnished) return false
    return true
  })

  const clearFilters = () => {
    setFilters({
      location: '',
      minRent: '',
      maxRent: '',
      bedrooms: '',
      petFriendly: false,
      parking: false,
      furnished: false
    })
  }

  const toggleSave = (aptId) => {
    // In a real app, this would save to backend
    console.log('Toggle save for apartment:', aptId)
  }

  // If user is logged in, show browse interface
  if (user) {
    return (
      <div className="home logged-in">
        {/* Browse Header */}
        <div className="browse-header">
          <div className="container">
            <div className="header-content">
              <div className="browse-title">
                <h1>Browse Properties</h1>
                <p>Find your perfect home from {apartments.length} available properties</p>
              </div>
              <div className="header-actions">
                <Link to="/saved" className="saved-link">
                  <span className="saved-icon">❤️</span>
                  Saved ({apartments.filter(apt => apt.saved).length})
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="filter-controls">
          <div className="container">
            <div className="filter-bar">
              <button 
                className={`filter-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                🔍 Filters
              </button>
              
              <div className="quick-filters">
                <button 
                  className={`quick-filter ${filters.petFriendly ? 'active' : ''}`}
                  onClick={() => setFilters({...filters, petFriendly: !filters.petFriendly})}
                >
                  🐕 Pet Friendly
                </button>
                <button 
                  className={`quick-filter ${filters.parking ? 'active' : ''}`}
                  onClick={() => setFilters({...filters, parking: !filters.parking})}
                >
                  🚗 Parking
                </button>
                <button 
                  className={`quick-filter ${filters.furnished ? 'active' : ''}`}
                  onClick={() => setFilters({...filters, furnished: !filters.furnished})}
                >
                  🛋️ Furnished
                </button>
              </div>

              <span className="results-count">
                {filteredApartments.length} properties
              </span>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="expanded-filters">
                <div className="filter-row">
                  <div className="filter-group">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="City, area..."
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label>Min Rent</label>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minRent}
                      onChange={(e) => setFilters({...filters, minRent: e.target.value})}
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label>Max Rent</label>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxRent}
                      onChange={(e) => setFilters({...filters, maxRent: e.target.value})}
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label>Min Bedrooms</label>
                    <select 
                      value={filters.bedrooms}
                      onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                    </select>
                  </div>
                  
                  <button className="clear-filters" onClick={clearFilters}>
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Property Listings */}
        <section className="properties-section">
          <div className="container">
            <div className="properties-grid">
              {filteredApartments.map(apartment => (
                <div key={apartment.id} className="property-card">
                  <div className="property-image">
                    <img src={apartment.image} alt={apartment.name} />
                    <button 
                      className={`save-btn ${apartment.saved ? 'saved' : ''}`}
                      onClick={() => toggleSave(apartment.id)}
                    >
                      {apartment.saved ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="property-info">
                    <h3>{apartment.name}</h3>
                    <p className="location">📍 {apartment.location}</p>
                    <p className="rent">Rs {apartment.rent.toLocaleString()}/month</p>
                    <div className="property-features">
                      <span>🛏️ {apartment.bedrooms} bed</span>
                      <span>🚿 {apartment.bathrooms} bath</span>
                      {apartment.parking && <span>🚗 Parking</span>}
                      {apartment.petFriendly && <span>🐕 Pet OK</span>}
                    </div>
                    <div className="property-actions">
                      <Link to={`/apartment/${apartment.id}`} className="view-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div className="banner-overlay">
          <div className="container">
            <div className="welcome-content">
              <h1 className="welcome-title">Find Your Perfect Home</h1>
              <p className="welcome-subtitle">
                Discover amazing properties from verified owners and trusted property managers across Sri Lanka
              </p>
              {!user && (
                <div className="welcome-actions">
                  <Link to="/register" className="btn btn-primary btn-large">
                    Join Us Today
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-large">
                    Login
                  </Link>
                </div>
              )}
              {user && (
                <div className="welcome-actions">
                  <p className="user-welcome">Welcome back, {user.name}!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Available Apartments */}
      <section className="apartments-section">
        <div className="container">
          <h2 className="section-title">Available Apartments</h2>
          <div className="apartments-grid">
            {apartments.map(apartment => (
              <div key={apartment.id} className="apartment-card">
                <img src={apartment.image} alt={apartment.name} className="apartment-image" />
                <div className="apartment-info">
                  <h3 className="apartment-name">{apartment.name}</h3>
                  <p className="apartment-location">📍 {apartment.location}</p>
                  <p className="apartment-description">{apartment.description}</p>
                  <div className="apartment-stats">
                    <span className="stat">
                      <strong>{apartment.availableUnits}</strong> available
                    </span>
                    <span className="stat">
                      <strong>{apartment.totalUnits}</strong> total units
                    </span>
                  </div>
                  <div className="apartment-price">
                    Starting from <strong>${apartment.startingPrice}/month</strong>
                  </div>
                  {user ? (
                    <Link to={`/apartment/${apartment.id}`} className="btn btn-primary btn-view">
                      View Details
                    </Link>
                  ) : (
                    <div className="guest-message">
                      <Link to="/register" className="register-link">Register</Link> to view details
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Register</h3>
              <p>Create your account as a user to access full apartment details</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Browse</h3>
              <p>Explore verified apartment listings with detailed information</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Contact</h3>
              <p>Connect directly with property managers and owners</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Move In</h3>
              <p>Find your perfect home and start your new chapter</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
