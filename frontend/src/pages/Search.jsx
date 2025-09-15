import React, { useState } from 'react'
import './Search.css'

const Search = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    furnished: ''
  })

  const [apartments, setApartments] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search filters:', searchFilters)
    // TODO: Implement search functionality
  }

  return (
    <div className="search">
      <div className="container">
        <h1 className="page-title">Find Your Perfect Apartment</h1>
        
        <div className="search-container">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  placeholder="Enter city or area"
                  value={searchFilters.location}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="minPrice">Min Price</label>
                <input
                  type="number"
                  id="minPrice"
                  name="minPrice"
                  className="form-control"
                  placeholder="Min price"
                  value={searchFilters.minPrice}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="maxPrice">Max Price</label>
                <input
                  type="number"
                  id="maxPrice"
                  name="maxPrice"
                  className="form-control"
                  placeholder="Max price"
                  value={searchFilters.maxPrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms</label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  className="form-control"
                  value={searchFilters.bedrooms}
                  onChange={handleInputChange}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="bathrooms">Bathrooms</label>
                <select
                  id="bathrooms"
                  name="bathrooms"
                  className="form-control"
                  value={searchFilters.bathrooms}
                  onChange={handleInputChange}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="furnished">Furnished</label>
                <select
                  id="furnished"
                  name="furnished"
                  className="form-control"
                  value={searchFilters.furnished}
                  onChange={handleInputChange}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-search">
              Search Apartments
            </button>
          </form>
        </div>

        <div className="results-section">
          <h2 className="results-title">Available Apartments</h2>
          <div className="apartments-grid">
            {apartments.map(apartment => (
              <div key={apartment.id} className="apartment-card">
                <img src={apartment.image} alt={apartment.title} className="apartment-image" />
                <div className="apartment-content">
                  <h3 className="apartment-title">{apartment.title}</h3>
                  <p className="apartment-location">📍 {apartment.location}</p>
                  <div className="apartment-details">
                    <span className="detail">🛏️ {apartment.bedrooms} BR</span>
                    <span className="detail">🚿 {apartment.bathrooms} Bath</span>
                    <span className="detail">
                      {apartment.furnished ? '🪑 Furnished' : '📦 Unfurnished'}
                    </span>
                  </div>
                  <div className="apartment-price">${apartment.price}/month</div>
                  <button className="btn btn-primary btn-contact">Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
