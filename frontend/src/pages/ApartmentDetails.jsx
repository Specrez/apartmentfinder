import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ApartmentDetails.css'

const ApartmentDetails = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  // Sample apartment data matching employee form structure
  const apartment = {
    id: parseInt(id),
    unitNumber: "101",
    title: "Modern 2BR Downtown Unit",
    address: "789 Sunset Blvd, Downtown, City",
    size: 850,
    rent: 1200,
    deposit: 2400,
    bedrooms: "2",
    bathrooms: "2",
    availableDate: "2024-10-01",
    petPolicy: "Cats allowed",
    parking: "1 assigned space",
    status: "available",
    features: [
      "Hardwood Floors",
      "Air Conditioning", 
      "Dishwasher",
      "Balcony",
      "Floor-to-ceiling Windows",
      "Walk-in Closet",
      "Washer/Dryer",
      "High Ceilings"
    ],
    description: "Beautiful modern 2-bedroom unit with city views and premium finishes. This stunning apartment features an open-concept living space, floor-to-ceiling windows, and premium finishes throughout. The kitchen boasts stainless steel appliances, quartz countertops, and a large island perfect for entertaining.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=600&fit=crop"
    ]
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  
  const [applicationData, setApplicationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentAddress: '',
    employer: '',
    income: '',
    moveInDate: '',
    message: ''
  })

  const [tourData, setTourData] = useState({
    date: '',
    time: '',
    message: ''
  })

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? apartment.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === apartment.images.length - 1 ? 0 : prev + 1
    )
  }

  const handleSaveApartment = () => {
    setIsSaved(!isSaved)
    if (!isSaved) {
      alert('Apartment saved to your favorites!')
    } else {
      alert('Apartment removed from favorites!')
    }
  }

  const handleApplication = (e) => {
    e.preventDefault()
    console.log('Application submitted:', applicationData)
    alert('Application submitted successfully! You will hear back within 24 hours.')
    setShowApplicationForm(false)
  }

  const handleScheduleTour = (e) => {
    e.preventDefault()
    console.log('Tour scheduled:', tourData)
    alert('Tour scheduled successfully! You will receive a confirmation email.')
    setShowScheduleForm(false)
  }

  const requiresLogin = () => {
    if (!user) {
      alert('Please log in to perform this action.')
      navigate('/login')
      return true
    }
    return false
  }

  return (
    <div className="apartment-details-page">
      <div className="container">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img 
              src={apartment.images[currentImageIndex]} 
              alt={`${apartment.title} - Image ${currentImageIndex + 1}`}
            />
            <button className="nav-btn prev-btn" onClick={handlePrevImage}>
              ‹
            </button>
            <button className="nav-btn next-btn" onClick={handleNextImage}>
              ›
            </button>
            <div className="image-counter">
              {currentImageIndex + 1} / {apartment.images.length}
            </div>
          </div>
          <div className="thumbnail-list">
            {apartment.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="details-layout">
          {/* Main Details */}
          <div className="main-details">
            <div className="header-section">
              <div className="title-info">
                <h1>{apartment.title}</h1>
                <p className="address">{apartment.address}</p>
                <div className="key-info">
                  <span className="rent">${apartment.rent}/month</span>
                  <span className="specs">
                    {apartment.bedrooms} bed • {apartment.bathrooms} bath • {apartment.size} sq ft
                  </span>
                </div>
              </div>
              <div className="action-buttons">
                <button 
                  className={`btn btn-outline ${isSaved ? 'saved' : ''}`}
                  onClick={handleSaveApartment}
                >
                  {isSaved ? '❤️ Saved' : '🤍 Save'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    if (requiresLogin()) return
                    setShowScheduleForm(true)
                  }}
                >
                  📅 Schedule Tour
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    if (requiresLogin()) return
                    setShowApplicationForm(true)
                  }}
                >
                  📋 Apply Now
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="section">
              <h2>Description</h2>
              <p>{apartment.description}</p>
            </div>

            {/* Features */}
            <div className="section">
              <h2>Unit Features</h2>
              <ul className="features-list">
                {apartment.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="info-card">
              <h3>Rental Information</h3>
              <div className="info-row">
                <span className="label">Unit Number:</span>
                <span className="value">{apartment.unitNumber}</span>
              </div>
              <div className="info-row">
                <span className="label">Monthly Rent:</span>
                <span className="value">${apartment.rent}</span>
              </div>
              <div className="info-row">
                <span className="label">Security Deposit:</span>
                <span className="value">${apartment.deposit}</span>
              </div>
              <div className="info-row">
                <span className="label">Size:</span>
                <span className="value">{apartment.size} sq ft</span>
              </div>
              <div className="info-row">
                <span className="label">Bedrooms:</span>
                <span className="value">{apartment.bedrooms}</span>
              </div>
              <div className="info-row">
                <span className="label">Bathrooms:</span>
                <span className="value">{apartment.bathrooms}</span>
              </div>
              <div className="info-row">
                <span className="label">Available Date:</span>
                <span className="value">{apartment.availableDate}</span>
              </div>
              <div className="info-row">
                <span className="label">Pet Policy:</span>
                <span className="value">{apartment.petPolicy}</span>
              </div>
              <div className="info-row">
                <span className="label">Parking:</span>
                <span className="value">{apartment.parking}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Application Modal */}
        {showApplicationForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Apply for {apartment.title}</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowApplicationForm(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleApplication} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={applicationData.firstName}
                      onChange={(e) => setApplicationData({...applicationData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={applicationData.lastName}
                      onChange={(e) => setApplicationData({...applicationData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={applicationData.phone}
                      onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Current Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={applicationData.currentAddress}
                    onChange={(e) => setApplicationData({...applicationData, currentAddress: e.target.value})}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Current Employer</label>
                    <input
                      type="text"
                      className="form-control"
                      value={applicationData.employer}
                      onChange={(e) => setApplicationData({...applicationData, employer: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Monthly Income</label>
                    <input
                      type="number"
                      className="form-control"
                      value={applicationData.income}
                      onChange={(e) => setApplicationData({...applicationData, income: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Preferred Move-in Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={applicationData.moveInDate}
                    onChange={(e) => setApplicationData({...applicationData, moveInDate: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Additional Message</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={applicationData.message}
                    onChange={(e) => setApplicationData({...applicationData, message: e.target.value})}
                    placeholder="Tell us why you'd be a great tenant..."
                  />
                </div>

                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowApplicationForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Schedule Tour Modal */}
        {showScheduleForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Schedule a Tour</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowScheduleForm(false)}
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleScheduleTour} className="modal-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={tourData.date}
                      onChange={(e) => setTourData({...tourData, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Time</label>
                    <select
                      className="form-control"
                      value={tourData.time}
                      onChange={(e) => setTourData({...tourData, time: e.target.value})}
                      required
                    >
                      <option value="">Select time</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={tourData.message}
                    onChange={(e) => setTourData({...tourData, message: e.target.value})}
                    placeholder="Any specific questions or requests for the tour?"
                  />
                </div>

                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowScheduleForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Schedule Tour
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

export default ApartmentDetails
