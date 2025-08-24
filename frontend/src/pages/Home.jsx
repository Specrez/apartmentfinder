import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = ({ user }) => {
  // Sri Lankan districts and cities data (All 25 districts)
  const districtsData = {
    // Western Province
    'Colombo': ['Colombo', 'Sri Jayawardenepura Kotte', 'Dehiwala-Mount Lavinia', 'Moratuwa', 'Ratmalana', 'Kolonnawa', 'Kesbewa'],
    'Gampaha': ['Gampaha', 'Negombo', 'Katunayake', 'Ja-Ela', 'Wattala', 'Kelaniya', 'Peliyagoda', 'Kadawatha', 'Ragama'],
    'Kalutara': ['Kalutara', 'Panadura', 'Horana', 'Beruwala', 'Aluthgama', 'Matugama', 'Wadduwa'],
    
    // Central Province  
    'Kandy': ['Kandy', 'Peradeniya', 'Gampola', 'Nawalapitiya', 'Wattegama', 'Kadugannawa', 'Katugastota'],
    'Matale': ['Matale', 'Dambulla', 'Sigiriya', 'Galewela', 'Ukuwela', 'Rattota'],
    'Nuwara Eliya': ['Nuwara Eliya', 'Hatton', 'Talawakele', 'Bandarawela', 'Welimada', 'Ragala', 'Ginigathena'],
    
    // Southern Province
    'Galle': ['Galle', 'Hikkaduwa', 'Ambalangoda', 'Elpitiya', 'Bentota', 'Baddegama', 'Yakkalamulla'],
    'Matara': ['Matara', 'Weligama', 'Mirissa', 'Dikwella', 'Dondra', 'Hakmana', 'Akuressa'],
    'Hambantota': ['Hambantota', 'Tangalle', 'Tissamaharama', 'Kataragama', 'Beliatta', 'Ambalantota'],
    
    // Northern Province
    'Jaffna': ['Jaffna', 'Chavakachcheri', 'Point Pedro', 'Karainagar', 'Velanai', 'Delft'],
    'Kilinochchi': ['Kilinochchi', 'Pallai', 'Paranthan', 'Poonakary'],
    'Mannar': ['Mannar', 'Nanattan', 'Madhu', 'Pesalai'],
    'Vavuniya': ['Vavuniya', 'Nedunkerni', 'Settikulam', 'Omanthai'],
    'Mullativu': ['Mullativu', 'Oddusuddan', 'Puthukudiyiruppu', 'Weli Oya'],
    
    // Eastern Province
    'Trincomalee': ['Trincomalee', 'Kinniya', 'Mutur', 'Kuchchaveli', 'Gomarankadawala'],
    'Batticaloa': ['Batticaloa', 'Kalmunai', 'Eravur', 'Valachchenai', 'Chenkalady'],
    'Ampara': ['Ampara', 'Akkaraipattu', 'Sainthamaruthu', 'Kalmunai', 'Sammanthurai', 'Uhana'],
    
    // North Western Province
    'Kurunegala': ['Kurunegala', 'Kuliyapitiya', 'Narammala', 'Wariyapola', 'Pannala', 'Melsiripura'],
    'Puttalam': ['Puttalam', 'Chilaw', 'Wennappuwa', 'Dankotuwa', 'Nattandiya', 'Marawila'],
    
    // North Central Province
    'Anuradhapura': ['Anuradhapura', 'Kekirawa', 'Thambuttegama', 'Eppawala', 'Medawachchiya'],
    'Polonnaruwa': ['Polonnaruwa', 'Kaduruwela', 'Medirigiriya', 'Hingurakgoda', 'Dimbulagala'],
    
    // Uva Province
    'Badulla': ['Badulla', 'Bandarawela', 'Ella', 'Haputale', 'Welimada', 'Mahiyanganaya', 'Passara'],
    'Monaragala': ['Monaragala', 'Wellawaya', 'Bibile', 'Medagama', 'Buttala'],
    
    // Sabaragamuwa Province
    'Ratnapura': ['Ratnapura', 'Balangoda', 'Embilipitiya', 'Pelmadulla', 'Eheliyagoda', 'Kuruwita'],
    'Kegalle': ['Kegalle', 'Mawanella', 'Warakapola', 'Rambukkana', 'Galigamuwa', 'Yatiyantota']
  }

  // Filter states
  const [filters, setFilters] = useState({
    district: '',
    city: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    amenities: []
  })

  const [activeFilter, setActiveFilter] = useState(null)
  const filterRef = useRef(null)

  // Price ranges in LKR
  const priceRanges = [
    { label: 'Below Rs. 25,000', value: '0-25000' },
    { label: 'Rs. 25,000 - 50,000', value: '25000-50000' },
    { label: 'Rs. 50,000 - 75,000', value: '50000-75000' },
    { label: 'Rs. 75,000 - 100,000', value: '75000-100000' },
    { label: 'Rs. 100,000 - 150,000', value: '100000-150000' },
    { label: 'Rs. 150,000 - 200,000', value: '150000-200000' },
    { label: 'Above Rs. 200,000', value: '200000+' }
  ]

  // Available amenities
  const amenitiesList = [
    'Parking', 'Swimming Pool', 'Gym', 'Playground', 'Security', 
    'Elevator', 'Garden', 'CCTV', 'Generator', 'Water Tank',
    'Internet', 'Cable TV', 'Laundry', 'Balcony', 'Terrace'
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveFilter(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  // Sample apartment units data for guests and users - matching employee form structure
  const [apartments, setApartments] = useState([
    {
      id: 1,
      unitNumber: "101",
      title: "Modern 2BR Downtown Unit",
      address: "789 Sunset Blvd, Colombo",
      district: "Colombo",
      city: "Colombo",
      size: 850,
      rent: 45000,
      deposit: 90000,
      bedrooms: "2",
      bathrooms: "2",
      availableDate: "2024-10-01",
      petPolicy: "Cats allowed",
      parking: "1 assigned space",
      status: "available",
      features: ["Hardwood Floors", "Air Conditioning", "Dishwasher", "Balcony"],
      amenities: ["Parking", "Security", "Elevator", "CCTV"],
      description: "Beautiful modern 2-bedroom unit with city views and premium finishes.",
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"]
    },
    {
      id: 2,
      unitNumber: "102", 
      title: "Cozy 1BR Garden View",
      address: "456 Green Valley Ave, Kandy",
      district: "Kandy",
      city: "Kandy",
      size: 600,
      rent: 28000,
      deposit: 56000,
      bedrooms: "1",
      bathrooms: "1",
      availableDate: "2024-09-15",
      petPolicy: "No pets",
      parking: "Street parking",
      status: "available",
      features: ["Garden View", "Carpet", "Heating", "Storage"],
      amenities: ["Garden", "Security", "Water Tank"],
      description: "Comfortable 1-bedroom unit with peaceful garden views.",
      images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"]
    },
    {
      id: 3,
      unitNumber: "201",
      title: "Spacious 3BR Family Unit", 
      address: "123 City Center Plaza, Galle",
      district: "Galle",
      city: "Galle",
      size: 1100,
      rent: 65000,
      deposit: 130000,
      bedrooms: "3",
      bathrooms: "2",
      availableDate: "2024-11-01",
      petPolicy: "Dogs allowed",
      parking: "2 assigned spaces",
      status: "available",
      features: ["High Ceilings", "Walk-in Closet", "Washer/Dryer", "Fireplace"],
      amenities: ["Parking", "Swimming Pool", "Gym", "Playground", "Security"],
      description: "Large family unit perfect for those needing extra space.",
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop"]
    }
  ])

  // Filter functions
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'district') {
      setFilters({ ...filters, district: value, city: '' }) // Reset city when district changes
    } else if (filterType === 'amenities') {
      const updatedAmenities = filters.amenities.includes(value)
        ? filters.amenities.filter(amenity => amenity !== value)
        : [...filters.amenities, value]
      setFilters({ ...filters, amenities: updatedAmenities })
    } else {
      setFilters({ ...filters, [filterType]: value })
    }
  }

  const clearFilters = () => {
    setFilters({
      district: '',
      city: '',
      priceRange: '',
      bedrooms: '',
      bathrooms: '',
      amenities: []
    })
  }

  // Filter apartments based on selected filters
  const filteredApartments = apartments.filter(apartment => {
    if (filters.district && apartment.district !== filters.district) return false
    if (filters.city && apartment.city !== filters.city) return false
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(p => parseInt(p))
      if (max) {
        if (apartment.rent < min || apartment.rent > max) return false
      } else {
        if (apartment.rent < min) return false
      }
    }
    
    if (filters.bedrooms && apartment.bedrooms !== filters.bedrooms) return false
    if (filters.bathrooms && apartment.bathrooms !== filters.bathrooms) return false
    
    if (filters.amenities.length > 0) {
      const hasAmenities = filters.amenities.every(amenity => 
        apartment.amenities.includes(amenity)
      )
      if (!hasAmenities) return false
    }
    
    return true
  })

  return (
    <div className="home">
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
          
          {/* Filters as small buttons for logged-in users */}
          {user && (
            <div className="filter-system" ref={filterRef}>
              <div className="browse-filters-bar">
                <div className="filter-dropdown">
                  <button 
                    className={`filter-btn ${activeFilter === 'location' ? 'active' : ''}`}
                    onClick={() => setActiveFilter(activeFilter === 'location' ? null : 'location')}
                  >
                    Location {filters.district && `(${filters.district}${filters.city ? ` - ${filters.city}` : ''})`}
                  </button>
                  {activeFilter === 'location' && (
                    <div className="filter-dropdown-content location-content">
                      <div className="dropdown-section">
                        <h4>Select District:</h4>
                        <div className="districts-list">
                          {Object.keys(districtsData).map(district => (
                            <div key={district} className="district-wrapper">
                              <button
                                className={`dropdown-option district-option ${filters.district === district ? 'selected' : ''}`}
                                onClick={() => handleFilterChange('district', district)}
                              >
                                <span className="district-name">{district}</span>
                                <span className="city-count">({districtsData[district].length})</span>
                              </button>
                              
                              {filters.district === district && (
                                <div className="cities-section">
                                  <div className="cities-grid">
                                    {districtsData[district].map(city => (
                                      <button
                                        key={city}
                                        className={`city-option ${filters.city === city ? 'selected' : ''}`}
                                        onClick={() => handleFilterChange('city', city)}
                                      >
                                        {city}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="filter-dropdown">
                  <button 
                    className={`filter-btn ${activeFilter === 'price' ? 'active' : ''}`}
                    onClick={() => setActiveFilter(activeFilter === 'price' ? null : 'price')}
                  >
                    Price {filters.priceRange && `(${priceRanges.find(p => p.value === filters.priceRange)?.label})`}
                  </button>
                  {activeFilter === 'price' && (
                    <div className="filter-dropdown-content">
                      <div className="dropdown-section">
                        <h4>Select Price Range:</h4>
                        {priceRanges.map(range => (
                          <button
                            key={range.value}
                            className={`dropdown-option ${filters.priceRange === range.value ? 'selected' : ''}`}
                            onClick={() => handleFilterChange('priceRange', range.value)}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="filter-dropdown">
                  <button 
                    className={`filter-btn ${activeFilter === 'bedrooms' ? 'active' : ''}`}
                    onClick={() => setActiveFilter(activeFilter === 'bedrooms' ? null : 'bedrooms')}
                  >
                    Bedrooms {filters.bedrooms && `(${filters.bedrooms})`}
                  </button>
                  {activeFilter === 'bedrooms' && (
                    <div className="filter-dropdown-content">
                      <div className="dropdown-section">
                        <h4>Select Bedrooms:</h4>
                        {['1', '2', '3', '4', '5+'].map(bedroom => (
                          <button
                            key={bedroom}
                            className={`dropdown-option ${filters.bedrooms === bedroom ? 'selected' : ''}`}
                            onClick={() => handleFilterChange('bedrooms', bedroom)}
                          >
                            {bedroom} Bedroom{bedroom !== '1' ? 's' : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="filter-dropdown">
                  <button 
                    className={`filter-btn ${activeFilter === 'bathrooms' ? 'active' : ''}`}
                    onClick={() => setActiveFilter(activeFilter === 'bathrooms' ? null : 'bathrooms')}
                  >
                    Bathrooms {filters.bathrooms && `(${filters.bathrooms})`}
                  </button>
                  {activeFilter === 'bathrooms' && (
                    <div className="filter-dropdown-content">
                      <div className="dropdown-section">
                        <h4>Select Bathrooms:</h4>
                        {['1', '2', '3', '4+'].map(bathroom => (
                          <button
                            key={bathroom}
                            className={`dropdown-option ${filters.bathrooms === bathroom ? 'selected' : ''}`}
                            onClick={() => handleFilterChange('bathrooms', bathroom)}
                          >
                            {bathroom} Bathroom{bathroom !== '1' ? 's' : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="filter-dropdown">
                  <button 
                    className={`filter-btn ${activeFilter === 'amenities' ? 'active' : ''}`}
                    onClick={() => setActiveFilter(activeFilter === 'amenities' ? null : 'amenities')}
                  >
                    Amenities {filters.amenities.length > 0 && `(${filters.amenities.length})`}
                  </button>
                  {activeFilter === 'amenities' && (
                    <div className="filter-dropdown-content">
                      <div className="dropdown-section">
                        <h4>Select Amenities:</h4>
                        <div className="amenities-grid">
                          {amenitiesList.map(amenity => (
                            <label key={amenity} className="amenity-checkbox">
                              <input
                                type="checkbox"
                                checked={filters.amenities.includes(amenity)}
                                onChange={() => handleFilterChange('amenities', amenity)}
                              />
                              {amenity}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {(filters.district || filters.priceRange || filters.bedrooms || filters.bathrooms || filters.amenities.length > 0) && (
                  <button className="filter-btn clear-filters" onClick={clearFilters}>
                    Clear All
                  </button>
                )}
              </div>
            </div>
          )}
          
          <div className="apartments-grid">
            {filteredApartments.length === 0 ? (
              <div className="no-results">
                <p>No apartments found matching your criteria.</p>
                <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
              </div>
            ) : (
              filteredApartments.map(apartment => (
                <div key={apartment.id} className="apartment-card">
                  <img src={apartment.images[0]} alt={apartment.title} className="apartment-image" />
                  <div className="apartment-info">
                    <h3 className="apartment-name">{apartment.title}</h3>
                    <p className="apartment-location">📍 {apartment.address}</p>
                    <p className="apartment-description">{apartment.description}</p>
                    <div className="apartment-stats">
                      <span className="stat">
                        <strong>{apartment.bedrooms}</strong> bed
                      </span>
                      <span className="stat">
                        <strong>{apartment.bathrooms}</strong> bath
                      </span>
                      <span className="stat">
                        <strong>{apartment.size}</strong> sq ft
                      </span>
                    </div>
                    <div className="apartment-price">
                      <strong>Rs. {apartment.rent.toLocaleString()}/month</strong>
                    </div>
                    <div className="apartment-details">
                      <small>Available: {apartment.availableDate}</small>
                      <small>Pets: {apartment.petPolicy}</small>
                      <small>Parking: {apartment.parking}</small>
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
              ))
            )}
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
